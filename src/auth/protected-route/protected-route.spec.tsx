import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { ROUTES } from '../../routes';
import { ProtectedRoute } from './protected-route';

let mockIsAuth: boolean;
let mockPathname: string;
let mockSearch: string | undefined;

vi.mock('../use-auth/use-auth', () => ({
  useAuth: () => ({ isAuth: mockIsAuth }),
}));

vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockPathname, search: mockSearch }),
  Navigate: vi.fn(),
}));

describe(ProtectedRoute.name, () => {
  afterEach(() => {
    mockIsAuth = false;
    mockPathname = '';
    mockSearch = undefined;
  });

  it('should not render the child when user is not logged in', () => {
    mockIsAuth = false;
    const childText = 'Hello';

    render(
      <ProtectedRoute>
        <h1>{childText}</h1>
      </ProtectedRoute>,
    );

    const child = screen.queryByText(childText);
    expect(child).toBeNull();
  });

  it('should render the child when user is logged in', () => {
    mockIsAuth = true;
    const childText = 'Hello';

    render(
      <ProtectedRoute>
        <h1>{childText}</h1>
      </ProtectedRoute>,
    );

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });

  it.each([['/foo/bar'], ['/foo/bar', '?baz=bat']])(
    'should navigate to the login page when user is not logged in',
    (pathname: string, search?: string) => {
      mockIsAuth = false;
      mockPathname = pathname;
      mockSearch = search;

      render(
        <ProtectedRoute>
          <h1>Hello</h1>
        </ProtectedRoute>,
      );

      expect(ReactRouterDom.Navigate).toBeCalledTimes(1);
      expect(ReactRouterDom.Navigate).toBeCalledWith(
        {
          replace: true,
          to: ROUTES.login,
          state: { from: `${mockPathname}${mockSearch ?? ''}` },
        },
        {}, // Don't know why but an extra object is being passed
      );
    },
  );

  it('should not navigate to the login page when user is logged in', () => {
    mockIsAuth = true;
    render(
      <ProtectedRoute>
        <h1>Hello</h1>
      </ProtectedRoute>,
    );
    expect(ReactRouterDom.Navigate).not.toBeCalled();
  });
});
