import { SignupDto, UserDto } from '../../api/types';

/**
 * Sends a signup request to the API.
 *
 * @param dto {@link SignupDto}
 * @throws An error if the signup fails with a status >= 400.
 * @returns A user DTO if signup is successful.
 */
export async function signup(dto: SignupDto): Promise<UserDto> {
  const res = await fetch('/api/auth/signup', {
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

  if (res.status >= 400) throw new Error(json?.message ?? 'Error signing up.');
  else return json;
}
