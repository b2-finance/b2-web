import {
  afterEach,
  assert,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { AuthProvider } from './auth-provider';
import { useAuth } from './use-auth';
import { UserDto } from '../../api/types';
import * as loginApi from './login';
import * as logoutApi from './logout';

const mockNavigate = vi.fn();
let mockLocation = {};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  assert(typeof actual === 'object');
  return {
    ...actual,
    useLocation: () => mockLocation,
    useNavigate: () => mockNavigate,
  };
});

function AuthProviderConsumer() {
  const { isAuth, userId, login, logout } = useAuth();
  return (
    <>
      <h1>Hello</h1>
      <div data-testid="isAuth">{isAuth?.toString()}</div>
      <div data-testid="userId">{userId}</div>
      <button
        type="button"
        onClick={() => login({ username: 'user', password: 'pass' })}
      >
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </>
  );
}

describe(AuthProvider.name, () => {
  let mockUser: UserDto;
  let user: UserEvent;
  let loginButton: HTMLElement;
  let logoutButton: HTMLElement;
  let userIdText: HTMLElement;
  let isAuthText: HTMLElement;

  let setup: () => void;

  beforeEach(() => {
    mockUser = {
      id: '1234',
      username: 'joe',
      email: 'joe@email.com',
    };
    user = userEvent.setup();

    setup = () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <AuthProviderConsumer />
          </AuthProvider>
        </BrowserRouter>,
      );

      loginButton = screen.getByRole('button', { name: 'Login' });
      logoutButton = screen.getByRole('button', { name: 'Logout' });
      userIdText = screen.getByTestId('userId');
      isAuthText = screen.getByTestId('isAuth');

      vi.spyOn(loginApi, 'login').mockResolvedValue(mockUser);
      vi.spyOn(logoutApi, 'logout').mockResolvedValue(true);
    };
  });

  afterEach(() => {
    mockLocation = {};
  });

  it('should render the child', () => {
    setup();
    const child = screen.getByText('Hello');
    expect(child).toBeInTheDocument();
  });

  it('should update the userId state when user logs in', async () => {
    setup();
    await user.click(loginButton);
    await waitFor(() => expect(userIdText.innerHTML).toEqual(mockUser.id));
  });

  it('should update the userId state when user logs out', async () => {
    setup();
    await user.click(logoutButton);
    await waitFor(() => expect(userIdText.innerHTML).toEqual(''));
  });

  it('should update the isAuth state when user logs in', async () => {
    setup();
    await user.click(loginButton);
    await waitFor(() => expect(isAuthText.innerHTML).toEqual('true'));
  });

  it('should update the isAuth state when user logs out', async () => {
    setup();
    await user.click(logoutButton);
    await waitFor(() => expect(isAuthText.innerHTML).toEqual('false'));
  });

  it('should navigate to the dashboard page after login when location state is not set', async () => {
    setup();
    await user.click(loginButton);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledTimes(1);
      expect(mockNavigate).toBeCalledWith(ROUTES.dashboard);
    });
  });

  it.each([['/foo/bar'], ['/foo/bar?baz=bat']])(
    'should navigate to the expected location after login when location state is set',
    async (from: string) => {
      mockLocation = { state: { from } };
      setup();

      await user.click(loginButton);
      await waitFor(() => {
        expect(mockNavigate).toBeCalledTimes(1);
        expect(mockNavigate).toBeCalledWith(from);
      });
    },
  );

  it('should navigate to the home page after logout', async () => {
    setup();
    await user.click(logoutButton);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledTimes(1);
      expect(mockNavigate).toBeCalledWith(ROUTES.home);
    });
  });
});
