import { Dispatch, SetStateAction } from 'react';
import { Input } from '../../components/input/input';
import { DEFAULT_ICON_WIDTH_PX } from '../../components/icons/icon-utils';
import MailIcon from '../../components/icons/mail-icon';

/**
 * Props for the {@link EmailInput} component.
 */
export interface EmailInputProps {
  id: string;
  className?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
}

/**
 * An input element (with label) for an email.
 *
 * @param props {@link EmailInputProps}
 * @returns A JSX element.
 */
export function EmailInput({
  id,
  className,
  value,
  setValue,
  label = 'Email',
}: EmailInputProps) {
  return (
    <label className={className} htmlFor={id}>
      {label}
      <Input
        id={id}
        name={id}
        type="email"
        autocomplete="email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        iconL={<MailIcon />}
        iconLSizePx={DEFAULT_ICON_WIDTH_PX}
      />
    </label>
  );
}
