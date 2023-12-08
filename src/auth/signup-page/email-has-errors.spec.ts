import { describe, expect, it } from 'vitest';
import { emailHasErrors } from './email-has-errors';

describe(emailHasErrors.name, () => {
  it.each([
    [''],
    [' '],
    ['aaa'],
    ['aaa.'],
    ['aaa.com'],
    ['@'],
    ['@mail.com'],
    ['aaa@'],
    ['aaa @com'],
    ['aaa@mail. com'],
    ['aaa@mail.c om'],
    ['aaa @mail.com'],
    ['a aa@mail.com'],
    ['aaa@.com'],
    ['aaa@..com'],
    ['aaa@@com'],
    ['aaa@@'],
  ])('should fail when email is invalid (email=%s)', (email: string) => {
    const errors = emailHasErrors(email);
    expect(errors).not.toEqual(null);
  });
});
