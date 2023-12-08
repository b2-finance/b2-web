import styles from './auth-page.module.scss';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

/**
 * Props for the {@link AuthOtherContent} component.
 */
export interface AuthOtherContentProps {
  className?: string;
}

/**
 * Displays additional non-form content on an auth page.
 *
 * @param props {@link AuthOtherContentProps}
 * @returns A JSX element.
 */
export function AuthOtherContent({
  className,
  children,
}: PropsWithChildren<AuthOtherContentProps>) {
  return (
    <div className={clsx(styles.authOtherContent, className)}>{children}</div>
  );
}
