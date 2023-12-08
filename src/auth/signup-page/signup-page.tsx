import authStyles from '../auth-page/auth-page.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { AuthPage } from '../auth-page/auth-page';
import { AuthErrors } from '../auth-page/auth-errors';
import { AuthForm } from '../auth-page/auth-form';
import { AuthOtherContent } from '../auth-page/auth-other-content';
import { useAuth } from '../use-auth/use-auth';
import { Button } from '../../components/button/button';
import { EmailInput } from '../auth-page/email-input';
import { UsernameInput } from '../auth-page/username-input';
import { PasswordInput } from '../auth-page/password-input';
import { emailHasErrors } from './email-has-errors';
import { usernameHasErrors } from './username-has-errors';
import { passwordHasErrors } from './password-has-errors';

export function SignupPage() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errors, setErrors] = useState<string[]>();
  const { signup } = useAuth();

  const handleSubmit = async () => {
    const errorList = [];

    const emailErrors = emailHasErrors(email);
    if (emailErrors) errorList.push(emailErrors);

    const usernameErrors = usernameHasErrors(username);
    if (usernameErrors) errorList.push(usernameErrors);

    const passwordErrors = passwordHasErrors(password);
    if (passwordErrors) errorList.push(passwordErrors);
    else if (password2 !== password) errorList.push('Passwords must match.');

    if (errorList.length) setErrors(errorList);
    else {
      const error = await signup({ email, username, password });
      if (error) setErrors([error]);
    }
  };

  return (
    <AuthPage>
      {errors && <AuthErrors errors={errors} />}
      <AuthForm title="Sign Up">
        <EmailInput id="email" value={email} setValue={setEmail} />
        <UsernameInput id="username" value={username} setValue={setUsername} />
        <PasswordInput
          id="password"
          type="new"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <PasswordInput
          id="re-enter-password"
          type="re-enter"
          label="Re-enter Password"
          value={password2}
          setValue={setPassword2}
        />
        <Button className={authStyles.submitButton} onClick={handleSubmit}>
          Create Account
        </Button>
      </AuthForm>
      <AuthOtherContent>
        Already have an account? <Link to={ROUTES.login}>Login</Link>
      </AuthOtherContent>
    </AuthPage>
  );
}
