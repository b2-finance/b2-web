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
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
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
  type = 'button',
  onClick,
  disabled = false,
  title,
}: ButtonProps) {
  return (
    <button
      id={id}
      className={clsx(styles.button, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}
