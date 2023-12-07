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
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { DEFAULT_ICON_WIDTH_PX } from '../../components/icons/icon-utils';
import UserIcon from '../../components/icons/user-icon';
import LockIcon from '../../components/icons/lock-icon';

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
        <label htmlFor="username">
          Username
          <Input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            iconL={<UserIcon />}
            iconLSizePx={DEFAULT_ICON_WIDTH_PX}
          />
        </label>
        <label htmlFor="password">
          Password
          <Input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            iconL={<LockIcon />}
            iconLSizePx={DEFAULT_ICON_WIDTH_PX}
          />
        </label>
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
