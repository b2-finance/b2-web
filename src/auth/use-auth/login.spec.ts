import { describe, expect, it, vi } from 'vitest';
import { login } from './login';

describe(login.name, () => {
  it('should return a user DTO when login is successful', async () => {
    const userDto = {
      id: '1234',
      username: 'joe',
      email: 'joe@email.com',
    };
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => userDto,
    });

    const user = await login({ username: userDto.username, password: 'pass' });
    expect(user).toEqual(userDto);
  });

  it('should throw an error when login fails with status >= 400', () => {
    global.fetch = vi.fn().mockResolvedValue({ status: 400 });

    expect(
      async () => await login({ username: 'user', password: 'pass' }),
    ).rejects.toThrowError();
  });
});
