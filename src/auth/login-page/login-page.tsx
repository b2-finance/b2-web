import authStyles from '../auth-page/auth-page.module.scss';
import loginStyles from './login-page.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { AuthPage } from '../auth-page/auth-page';
import { AuthErrors } from '../auth-page/auth-errors';
import { AuthForm } from '../auth-page/auth-form';
import { AuthOtherContent } from '../auth-page/auth-other-content';
import { useAuth } from '../use-auth/use-auth';
import { Button } from '../../components/button/button';
import { UsernameInput } from '../auth-page/username-input';
import { PasswordInput } from '../auth-page/password-input';

export function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>();
  const { login } = useAuth();

  const handleSubmit = async () => {
    const errorList = [];

    if (!username?.trim()) errorList.push('Username must not be empty.');
    if (!password?.trim()) errorList.push('Password must not be empty.');

    if (errorList.length) setErrors(errorList);
    else {
      const error = await login({ username, password });
      if (error) setErrors([error]);
    }
  };

  return (
    <AuthPage>
      {errors && <AuthErrors errors={errors} />}
      <AuthForm title="Login">
        <UsernameInput id="username" value={username} setValue={setUsername} />
        <PasswordInput
          id="password"
          type="current"
          value={password}
          setValue={setPassword}
        />
        <Button className={authStyles.submitButton} onClick={handleSubmit}>
          Login
        </Button>
        <Link id={loginStyles.forgotPassword} to={ROUTES.forgotPassword}>
          Forgot Password?
        </Link>
      </AuthForm>
      <AuthOtherContent>
        New to B2? <Link to={ROUTES.signup}>Create an account</Link>
      </AuthOtherContent>
    </AuthPage>
  );
}
