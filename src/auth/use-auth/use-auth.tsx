import { useContext } from 'react';
import { AuthContext, AuthContextType } from './auth-provider';

/**
 * Syntactic sugar for `useContext(AuthContext)`.
 *
 * @returns An {@link AuthContextType}.
 */
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
