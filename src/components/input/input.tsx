import styles from './input.module.scss';
import clsx from 'clsx';
import { CSSProperties, ChangeEvent, ReactNode } from 'react';

/**
 * Common props for the {@link Input} component.
 */
export type CommonInputProps = {
  id?: string;
  className?: string;
  name: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  autocomplete: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  icon?: ReactNode;
  iconSizePx?: number;
};

export type TextInputType = 'password' | 'search' | 'tel' | 'text' | 'url';
export type EmailInputType = 'email';
export type DateInputType =
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week';
export type NumberInputType = 'number';
export type InputType =
  | TextInputType
  | EmailInputType
  | DateInputType
  | NumberInputType;

/**
 * Conditional props (based on `type`) for the {@link Input} component.
 */
export type ConditionalInputProps =
  | {
      type: TextInputType;
      maxlength?: number;
      minlength?: number;
      pattern?: string;
      placeholder?: string;
      size?: number;

      // does not apply
      max?: never;
      min?: never;
      multiple?: never;
      step?: never;
    }
  | {
      type: EmailInputType;
      maxlength?: number;
      minlength?: number;
      multiple?: boolean;
      pattern?: string;
      placeholder?: string;
      size?: number;

      // does not apply
      max?: never;
      min?: never;
      step?: never;
    }
  | {
      type: DateInputType;
      max?: string;
      min?: string;
      step?: number;

      // does not apply
      maxlength?: never;
      minlength?: never;
      multiple?: never;
      pattern?: never;
      placeholder?: never;
      size?: never;
    }
  | {
      type: NumberInputType;
      max?: number;
      min?: number;
      placeholder?: string;
      step?: number;

      // does not apply
      maxlength?: never;
      minlength?: never;
      multiple?: never;
      pattern?: never;
      size?: never;
    };

/**
 * Props for the {@link Input} component.
 */
export type InputProps = CommonInputProps & ConditionalInputProps;

/**
 * An input element.
 *
 * Valid types:
 * `date`
 * `datetime-local`
 * `email`
 * `month`
 * `number`
 * `password`
 * `search`
 * `tel`
 * `text`
 * `time`
 * `url`
 * `week`
 *
 * @param props {@link InputProps}
 * @returns A JSX element.
 */
export function Input({
  id,
  className,
  name,
  type = 'text',
  value = '',
  onChange,
  invalid = false,
  autocomplete,
  disabled = false,
  max,
  min,
  maxlength,
  minlength,
  multiple,
  pattern,
  placeholder,
  readonly = false,
  required = false,
  size,
  step,
  icon,
  iconSizePx,
}: InputProps) {
  const iconStyle = { '--iconSize': iconSizePx } as CSSProperties;

  return (
    <div className={clsx(styles.inputContainer, className)}>
      <input
        id={id}
        className={clsx(styles.input, invalid && 'invalid')}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
        disabled={disabled}
        max={max}
        min={min}
        maxLength={maxlength}
        minLength={minlength}
        multiple={multiple}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={readonly}
        required={required}
        size={size}
        step={step}
        style={iconStyle}
      />
      {icon && (
        <div className={styles.inputIcon} style={iconStyle}>
          {icon}
        </div>
      )}
    </div>
  );
}
