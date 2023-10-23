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

    const user = await login({ username: 'user', password: 'pass' });
    expect(user).toEqual(userDto);
  });
});
