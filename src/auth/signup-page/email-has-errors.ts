import { validateString } from '../../utilities/validations/validate-string';
import { joinList } from '../../utilities/join-list/join-list';

/**
 * Checks if the given string is a properly formatted email.
 *
 * @param email A string to validate.
 * @returns A string of required criteria that the email does not satisfy,
 *          or null if it is valid.
 * @see https://www.abstractapi.com/tools/email-regex-guide
 */
export function emailHasErrors(email: string): string | null {
  const errors = validateString({
    str: email,
    notEmpty: true,
    criteria: [
      {
        test: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        name: 'be in valid format',
      },
    ],
  });
  return errors?.length ? joinList(errors, 'Email must') : null;
}
