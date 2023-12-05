import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { login as loginApi } from './login';
import { logout as logoutApi } from './logout';
import { LoginDto } from '../../api/types';

export interface AuthContextType {
  /**
   * The current authentication state of the user.
   */
  isAuth: boolean;
  /**
   * The current user's unique id.
   */
  userId: string | null;
  /**
   * Logs the user into the app.
   *
   * @param dto {@link LoginDto}
   * @returns An error message if the login fails, or void if it succeeds.
   */
  login: (dto: LoginDto) => Promise<string | void>;
  /**
   * Logs the user out of the app.
   *
   * @returns void
   */
  logout: () => void;
}

/**
 * Provides user authentication state and functions.
 */
export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  userId: null,
  login: (_dto) => Promise.resolve(''),
  logout: () => {},
});

/**
 * Props for the {@link AuthProvider} component.
 */
export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider for the {@link AuthContext}.
 *
 * @param props {@link AuthProviderProps}
 * @returns A context provider.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const userIdKey = 'user-id';

  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem(userIdKey),
  );

  useEffect(() => localStorage.setItem(userIdKey, userId ?? ''), [userId]);

  const login = async (dto: LoginDto) => {
    try {
      const user = await loginApi(dto);
      setUserId(user?.id ?? null);
      user && navigate(location.state?.from ?? ROUTES.dashboard);
    } catch (error) {
      return (error as Error).message;
    }
  };

  const logout = async () => {
    const success = await logoutApi();

    if (success) {
      setUserId(null);
      navigate(ROUTES.home);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth: !!userId, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
