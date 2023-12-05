import { LoginDto, UserDto } from '../../api/types';

/**
 * Sends a login request to the API.
 *
 * @param dto {@link LoginDto}
 * @throws An error if the login fails with a status >= 400.
 * @returns A user DTO if login is successful.
 */
export async function login(dto: LoginDto): Promise<UserDto> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto),
  });

  let json;

  try {
    json = await res.json();
  } catch (error) {
    // No response body.
  }

  if (res.status >= 400) throw new Error(json?.message ?? 'Error logging in.');
  else return json;
}
