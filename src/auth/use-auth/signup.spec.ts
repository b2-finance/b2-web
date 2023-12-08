import { describe, expect, it, vi } from 'vitest';
import { signup } from './signup';

describe(signup.name, () => {
  it('should return a user DTO when signup is successful', async () => {
    const userDto = {
      id: '1234',
      username: 'joe',
      email: 'joe@email.com',
    };
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => userDto,
    });

    const user = await signup({
      email: userDto.email,
      username: userDto.username,
      password: 'pass',
    });

    expect(user).toEqual(userDto);
  });

  it('should throw an error when signup fails with status >= 400', () => {
    global.fetch = vi.fn().mockResolvedValue({ status: 400 });

    expect(
      async () =>
        await signup({
          email: 'user@email.com',
          username: 'user',
          password: 'pass',
        }),
    ).rejects.toThrowError();
  });
});
