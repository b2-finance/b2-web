import { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

/**
 * Props for the {@link Button} component.
 */
export interface ButtonProps {
  children: ReactNode;
  id?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

/**
 * A button.
 *
 * @param props {@link ButtonProps}
 * @returns A JSX element.
 */
export function Button({
  children,
  id,
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      id={id}
      className={clsx(styles.button, className && className)}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
