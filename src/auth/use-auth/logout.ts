/**
 * Sends a logout request to the API.
 *
 * @returns True if the logout is successful, or false otherwise.
 */
export async function logout(): Promise<boolean> {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  });
  return Boolean(await res.text());
}
