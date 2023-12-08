import styles from './auth-page.module.scss';
import { AuthOtherContent } from './auth-other-content';

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
    <AuthOtherContent className={styles.errors}>
      {errors.map((error, i) => (
        <div key={i}>{error}</div>
      ))}
    </AuthOtherContent>
  );
}
