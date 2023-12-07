import { Dispatch, useState } from 'react';
import styles from './auth-page.module.scss';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { DEFAULT_ICON_WIDTH_PX } from '../../components/icons/icon-utils';
import LockIcon from '../../components/icons/lock-icon';
import EyeIcon from '../../components/icons/eye-icon';
import EyeSlashIcon from '../../components/icons/eye-slash-icon';

/**
 * Props for the {@link PasswordInput} component.
 */
export interface PasswordInputProps {
  id: string;
  className?: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  type: 'current' | 'new' | 're-enter';
}

/**
 * An input element (with label) for a password. Contains a 'View Password'
 * button that, when clicked, toggles the password from secure to plaintext.
 *
 * @param props {@link PasswordInputProps}
 * @returns A JSX element.
 */
export function PasswordInput({
  id,
  className,
  value,
  setValue,
  type,
}: PasswordInputProps) {
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  let label;
  let autocomplete;

  switch (type) {
    case 'current':
      label = 'Current Password';
      autocomplete = 'current-password';
      break;
    case 'new':
      label = 'New Password';
      autocomplete = 'new-password';
      break;
    case 're-enter':
      label = 'Re-enter Password';
      autocomplete = 'off';
      break;
  }

  return (
    <label className={className} htmlFor={id}>
      {label}
      <Input
        id={id}
        name={id}
        type={viewPassword ? 'text' : 'password'}
        autocomplete={autocomplete}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        iconL={<LockIcon />}
        iconR={
          <Button
            className={styles.viewPasswordButton}
            onClick={() => setViewPassword((prev) => !prev)}
            title={label}
          >
            {viewPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </Button>
        }
        iconLSizePx={DEFAULT_ICON_WIDTH_PX}
        iconRSizePx={DEFAULT_ICON_WIDTH_PX}
      />
    </label>
  );
}
