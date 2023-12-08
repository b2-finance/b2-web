import { validateString } from '../../components/validations/validate-string';
import { joinList } from '../../components/join-list';

/**
 * Checks if the given string is a properly formatted password according to the
 * following criteria:
 *
 * - must be 12-32 characters in length
 * - must contain a lowercase letter
 * - must contain an uppercase letter
 * - must contain a digit
 * - must contain a special character from `~!@#$%^&*()-_=+[]{},./<>?
 *
 * @param password A string to validate.
 * @returns A string of required criteria that the password does not satisfy,
 *          or null if it is valid.
 */
export function passwordHasErrors(password: string): string | null {
  const errors = validateString({
    str: password,
    notEmpty: true,
    criteria: [
      {
        test: /^.{12,32}$/,
        name: 'be 12-32 characters',
      },
      {
        test: /[a-z]+/,
        name: 'contain a lowercase letter',
      },
      {
        test: /[A-Z]+/,
        name: 'contain an uppercase letter',
      },
      {
        test: /[0-9]+/,
        name: 'contain a digit',
      },
      {
        test: /[`~!@#$%^&*()\-_=+[\]{},./<>?]+/,
        name: 'contain a special character',
      },
    ],
  });
  return errors?.length ? joinList(errors, 'Password must') : null;
}
