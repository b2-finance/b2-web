import { describe, expect, it } from 'vitest';
import { passwordHasErrors } from './password-has-errors';

describe(passwordHasErrors.name, () => {
  it('should fail when password is empty', () => {
    const errors = passwordHasErrors('');
    expect(errors).toEqual('Password must not be empty.');
    expect(errors).not.toEqual(null);
  });

  it.each([['aA1!'], ['aA1!5678901'], ['aA1!56789012345678901234567890123']])(
    'should fail when password is not 12-32 characters (password=%s)',
    (password: string) => {
      const errors = passwordHasErrors(password);
      expect(errors).toEqual('Password must be 12-32 characters.');
      expect(errors).not.toEqual(null);
    },
  );

  it('should fail when password does not contain a lowercase letter', () => {
    const errors = passwordHasErrors('!1AAAAAAAAAA');
    expect(errors).toEqual('Password must contain a lowercase letter.');
    expect(errors).not.toEqual(null);
  });

  it('should fail when password does not contain an uppercase letter', () => {
    const errors = passwordHasErrors('!1aaaaaaaaaa');
    expect(errors).toEqual('Password must contain an uppercase letter.');
    expect(errors).not.toEqual(null);
  });

  it('should fail when password does not contain a digit', () => {
    const errors = passwordHasErrors('aA!aA!aA!aA!');
    expect(errors).toEqual('Password must contain a digit.');
    expect(errors).not.toEqual(null);
  });

  it('should fail when password does not contain a special character', () => {
    const errors = passwordHasErrors('aA3456789012');
    expect(errors).toEqual('Password must contain a special character.');
    expect(errors).not.toEqual(null);
  });
});
