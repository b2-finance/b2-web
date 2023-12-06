import styles from './auth-page.module.scss';
import { PropsWithChildren } from 'react';

/**
 * A container for an auth page.
 *
 * @param props Children
 * @returns A JSX element.
 */
export function AuthPage({ children }: PropsWithChildren) {
  return (
    <div className={styles.auth}>
      <div className={styles.innerContainer}>{children}</div>
    </div>
  );
}
