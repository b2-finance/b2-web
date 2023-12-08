import { validateString } from '../../components/validations/validate-string';
import { joinList } from '../../components/join-list';

/**
 * Checks if the given string is a properly formatted username according to the
 * following criteria:
 *
 * - must be 3-32 characters in length
 * - must begin with a letter
 * - must contain only letters, digits, dashes (-), or underscores (_)
 *
 * @param username A string to validate.
 * @returns A string of required criteria that the username does not satisfy,
 *          or null if it is valid.
 */
export function usernameHasErrors(username: string): string | null {
  const errors = validateString({
    str: username,
    notEmpty: true,
    criteria: [
      {
        test: /^.{3,32}$/,
        name: 'be 3-32 characters',
      },
      {
        test: /^[a-zA-Z]/,
        name: 'begin with a letter',
      },
      {
        test: /^[\w-]+$/,
        name: 'contain only letters, digits, dashes (-), or underscores (_)',
      },
    ],
  });
  return errors?.length ? joinList(errors, 'Username must') : null;
}
