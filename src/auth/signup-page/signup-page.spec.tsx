import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignupPage } from './signup-page';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as emailHasErrors from './email-has-errors';
import * as usernameHasErrors from './username-has-errors';
import * as passwordHasErrors from './password-has-errors';

const mockSignup = vi.fn();

vi.mock('../use-auth/use-auth', () => ({
  useAuth: () => ({ signup: mockSignup }),
}));

describe(SignupPage.name, () => {
  it('should render an email input', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Email/);
    expect(input).toBeInTheDocument();
  });

  it('should render a username input', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Username/);
    expect(input).toBeInTheDocument();
  });

  it('should render a password input', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/^Password$/);
    expect(input).toBeInTheDocument();
  });

  it('should render a re-enter-password input', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const input = screen.getByLabelText(/Re-enter Password/);
    expect(input).toBeInTheDocument();
  });

  it('should render a signup button', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: /Create Account/ });
    expect(button).toBeInTheDocument();
  });

  it('should render a link to the login page', () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: /Login/ });
    expect(link).toBeInTheDocument();
  });

  it.each([
    [false, false, false, false, false],
    [false, false, false, true, false],
    [false, false, true, false, false],
    [false, false, true, true, false],
    [false, true, false, false, false],
    [false, true, false, true, false],
    [false, true, true, false, false],
    [false, true, true, true, false],
    [true, false, false, false, false],
    [true, false, false, true, false],
    [true, false, true, false, false],
    [true, false, true, true, false],
    [true, true, false, false, false],
    [true, true, false, true, false],
    [true, true, true, false, false],
    [true, true, true, true, true],
  ])(
    'should call signup() when signup button clicked as expected (email=%s, user=%s, pass=%s, passMatch=%s)',
    async (
      validEmail: boolean,
      validUser: boolean,
      validPass: boolean,
      passMatch: boolean,
      signup: boolean,
    ) => {
      const user = userEvent.setup();

      vi.spyOn(emailHasErrors, 'emailHasErrors').mockReturnValue(
        validEmail ? null : 'error',
      );
      vi.spyOn(usernameHasErrors, 'usernameHasErrors').mockReturnValue(
        validUser ? null : 'error',
      );
      vi.spyOn(passwordHasErrors, 'passwordHasErrors').mockReturnValue(
        validPass ? null : 'error',
      );

      render(
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>,
      );

      const emailInput = screen.getByLabelText(/Email/);
      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText(/^Password$/);
      const password2Input = screen.getByLabelText(/Re-enter Password/);
      const button = screen.getByRole('button', { name: /Create Account/ });

      await user.type(emailInput, 'email');
      await user.type(usernameInput, 'user');
      await user.type(passwordInput, 'pass');
      await user.type(password2Input, passMatch ? 'pass' : 'different-pass');
      await user.click(button);

      expect(mockSignup).toHaveBeenCalledTimes(signup ? 1 : 0);
    },
  );

  it.each([
    [false, false, false, false],
    [false, false, false, true],
    [false, false, true, false],
    [false, false, true, true],
    [false, true, false, false],
    [false, true, false, true],
    [false, true, true, false],
    [false, true, true, true],
    [true, false, false, false],
    [true, false, false, true],
    [true, false, true, false],
    [true, false, true, true],
    [true, true, false, false],
    [true, true, false, true],
    [true, true, true, false],
  ])(
    'should display errors when signup button clicked and inputs invalid (email=%s, user=%s, pass=%s, passMatch=%s)',
    async (
      validEmail: boolean,
      validUser: boolean,
      validPass: boolean,
      passMatch: boolean,
    ) => {
      const user = userEvent.setup();

      vi.spyOn(emailHasErrors, 'emailHasErrors').mockReturnValue(
        validEmail ? null : 'error',
      );
      vi.spyOn(usernameHasErrors, 'usernameHasErrors').mockReturnValue(
        validUser ? null : 'error',
      );
      vi.spyOn(passwordHasErrors, 'passwordHasErrors').mockReturnValue(
        validPass ? null : 'error',
      );

      render(
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>,
      );

      const emailInput = screen.getByLabelText(/Email/);
      const usernameInput = screen.getByLabelText(/Username/);
      const passwordInput = screen.getByLabelText(/^Password$/);
      const password2Input = screen.getByLabelText(/Re-enter Password/);
      const button = screen.getByRole('button', { name: /Create Account/ });

      await user.type(emailInput, 'email');
      await user.type(usernameInput, 'user');
      await user.type(passwordInput, 'pass');
      await user.type(password2Input, passMatch ? 'pass' : 'different-pass');
      await user.click(button);

      const errors = screen.getAllByText(/error|Passwords must match/);

      const errorCount = [
        validEmail,
        validUser,
        validPass,
        validPass ? passMatch : null, // password match checked only if 1st password is valid
      ].filter((x) => x === false).length;

      expect(errors.length).toEqual(errorCount);
      expect(mockSignup).not.toHaveBeenCalled();
    },
  );
});
