import { LoginDto, UserDto } from '../../api/types';

/**
 * Sends a login request to the API.
 *
 * @param dto {@link LoginDto}
 * @returns A user DTO if login is successful.
 */
export async function login(dto: LoginDto): Promise<UserDto> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto),
  });
  return await res.json();
}
