import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './login-page';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockLogin = vi.fn();

vi.mock('../use-auth/use-auth', () => ({
  useAuth: () => ({ login: mockLogin }),
}));

describe(LoginPage.name, () => {
  it('should render a username input', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Username/);
    expect(input).toBeInTheDocument();
  });

  it('should render a password input', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Password/);
    expect(input).toBeInTheDocument();
  });

  it('should render a login button', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: /Login/ });
    expect(button).toBeInTheDocument();
  });

  it('should render a forgot password link', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /Forgot Password/ });
    expect(link).toBeInTheDocument();
  });

  it('should render a link to the create account page', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /Create an account/ });
    expect(link).toBeInTheDocument();
  });

  it.each([
    ['', '', false],
    [' ', '', false],
    ['', ' ', false],
    [' ', ' ', false],
    ['user', '', false],
    ['user', ' ', false],
    ['', 'pass', false],
    [' ', 'pass', false],
    ['user', 'pass', true],
  ])(
    'should call login() when login button clicked as expected (user="%s", pass="%s")',
    async (username: string, password: string, login: boolean) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>,
      );

      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText(/Password/);
      const button = screen.getByRole('button', { name: /Login/ });

      username && (await user.type(usernameInput, username));
      password && (await user.type(passwordInput, password));
      await user.click(button);

      expect(mockLogin).toHaveBeenCalledTimes(login ? 1 : 0);
    },
  );

  it.each([
    ['', '', 2],
    [' ', '', 2],
    ['', ' ', 2],
    [' ', ' ', 2],
    ['user', '', 1],
    ['user', ' ', 1],
    ['', 'pass', 1],
    [' ', 'pass', 1],
  ])(
    'should display errors when login button clicked and inputs invalid (user="%s", pass="%s")',
    async (username: string, password: string, errorCount: number) => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>,
      );

      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText(/Password/);
      const button = screen.getByRole('button', { name: /Login/ });

      username && (await user.type(usernameInput, username));
      password && (await user.type(passwordInput, password));
      await user.click(button);

      const errors = screen.getAllByText(/must not be empty/);
      expect(errors.length).toEqual(errorCount);
    },
  );
});
