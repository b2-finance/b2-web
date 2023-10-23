import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../common/routes';
import { useAuth } from '../use-auth/use-auth';

/**
 * Props for the {@link ProtectedRoute} component.
 */
export interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A wrapper component that renders its child if the user is logged in. If the
 * user is not logged in, redirects to the login page.
 *
 * @param props {@link ProtectedRouteProps}
 * @returns The child component if the user is logged in.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuth } = useAuth();
  const { pathname, search } = useLocation();

  if (!isAuth)
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: `${pathname}${search ?? ''}` }}
      />
    );
  else return <>{children}</>;
}
