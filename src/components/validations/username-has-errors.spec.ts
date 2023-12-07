import { describe, expect, it } from 'vitest';
import { usernameHasErrors } from './username-has-errors';

describe(usernameHasErrors.name, () => {
  it('should fail when username is empty', () => {
    const errors = usernameHasErrors('');
    expect(errors).toEqual('Username must not be empty.');
    expect(errors).not.toEqual(null);
  });

  it.each([['a'], ['ab'], ['a23456789012345678901234567890123']])(
    'should fail when username is not 3-32 characters (username=%s)',
    (username: string) => {
      const errors = usernameHasErrors(username);
      expect(errors).toEqual('Username must be 3-32 characters in length.');
      expect(errors).not.toEqual(null);
    },
  );

  it.each([['1aa'], ['_1a'], ['-1a']])(
    'should fail when username does not begin with a letter (username=%s)',
    (username: string) => {
      const errors = usernameHasErrors(username);
      expect(errors).toEqual('Username must begin with a letter.');
      expect(errors).not.toEqual(null);
    },
  );

  it.each([
    ['aa a'],
    ['aaa '],
    ['aaa`'],
    ['aaa~'],
    ['aaa!'],
    ['aaa@'],
    ['aaa#'],
    ['aaa$'],
    ['aaa%'],
    ['aaa^'],
    ['aaa&'],
    ['aaa*'],
    ['aaa('],
    ['aaa)'],
    ['aaa='],
    ['aaa+'],
    ['aaa['],
    ['aaa]'],
    ['aaa{'],
    ['aaa}'],
    ['aaa;'],
    ['aaa:'],
    ["aaa'"],
    ['aaa"'],
    ['aaa,'],
    ['aaa.'],
    ['aaa/'],
    ['aaa<'],
    ['aaa>'],
    ['aaa?'],
  ])(
    'should fail when username contains invalid characters (username=%s)',
    (username: string) => {
      const errors = usernameHasErrors(username);
      expect(errors).toEqual(
        'Username must contain only uppercase letters, lowercase letters, digits, dashes (-), underscores (_).',
      );
      expect(errors).not.toEqual(null);
    },
  );
});
