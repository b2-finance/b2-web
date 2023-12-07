import { Dispatch } from 'react';
import { Input } from '../../components/input/input';
import { DEFAULT_ICON_WIDTH_PX } from '../../components/icons/icon-utils';
import UserIcon from '../../components/icons/user-icon';

/**
 * Props for the {@link UsernameInput} component.
 */
export interface UsernameInputProps {
  id: string;
  className?: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

/**
 * An input element (with label) for a username.
 *
 * @param props {@link UsernameInputProps}
 * @returns A JSX element.
 */
export function UsernameInput({
  id,
  className,
  value,
  setValue,
}: UsernameInputProps) {
  return (
    <label className={className} htmlFor={id}>
      Username
      <Input
        id={id}
        name={id}
        type="text"
        autocomplete="username"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        iconL={<UserIcon />}
        iconLSizePx={DEFAULT_ICON_WIDTH_PX}
      />
    </label>
  );
}
