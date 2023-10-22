import { isRouteErrorResponse } from 'react-router-dom';

/**
 * Returns the given error as a string.
 *
 * @param error An error object.
 * @returns The error as a string.
 * @see https://github.com/remix-run/react-router/discussions/9628
 */
export function getErrorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    console.error(error);
    return 'Unknown error.';
  }
}
