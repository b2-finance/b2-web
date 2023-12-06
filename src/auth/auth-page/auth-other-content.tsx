import styles from './auth-page.module.scss';
import { PropsWithChildren } from 'react';

/**
 * Displays additional non-form content on an auth page.
 *
 * @param props Children
 * @returns A JSX element.
 */
export function AuthOtherContent({ children }: PropsWithChildren) {
  return <div className={styles.authOtherContent}>{children}</div>;
}
