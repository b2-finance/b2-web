import styles from './auth-page.module.scss';

/**
 * Props for the {@link AuthErrors} component.
 */
export interface AuthErrorsProps {
  errors?: string[];
}

/**
 * Displays the active errors on an auth page.
 *
 * @param props {@link AuthErrorsProps}
 * @returns A JSX element.
 */
export function AuthErrors({ errors = [] }: AuthErrorsProps) {
  return (
    <div className={styles.authErrors}>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
    </div>
  );
}
