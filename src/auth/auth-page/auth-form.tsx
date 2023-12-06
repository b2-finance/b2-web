import styles from './auth-page.module.scss';
import { PropsWithChildren } from 'react';

/**
 * Props for the {@link AuthForm} component.
 */
export interface AuthFormProps {
  title: string;
}

/**
 * A container for the form elements on an auth page.
 *
 * @param props {@link AuthFormProps}
 * @returns A JSX element.
 */
export function AuthForm({
  children,
  title,
}: PropsWithChildren<AuthFormProps>) {
  return (
    <div className={styles.authFormContainer}>
      <h1 className={styles.title}>{title}</h1>
      <form
        className={styles.formContent}
        name={title.toLowerCase() + '-form'}
        autoComplete="on"
      >
        {children}
      </form>
    </div>
  );
}
