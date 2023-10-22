import { afterEach, describe, expect, it, vi } from 'vitest';
import { getErrorMessage } from './get-error-message';

let mockIsRouteErrorResponse: boolean;

vi.mock('react-router-dom', () => ({
  isRouteErrorResponse: () => mockIsRouteErrorResponse,
}));

describe(getErrorMessage.name, () => {
  afterEach(() => {
    mockIsRouteErrorResponse = false;
  });

  it('should display the error status', () => {
    mockIsRouteErrorResponse = true;
    const error = {
      status: 500,
      statusText: 'This is an error.',
    };
    const actual = getErrorMessage(error);
    expect(actual).toEqual(`${error.status} ${error.statusText}`);
  });

  it('should display the error message', () => {
    const message = 'This is an error.';
    const error = new Error(message);
    const actual = getErrorMessage(error);
    expect(actual).toEqual(error.message);
  });

  it('should display the error string', () => {
    const error = 'This is an error.';
    const actual = getErrorMessage(error);
    expect(actual).toEqual(error);
  });

  it('should display "Unknown error" when error unknown', () => {
    vi.spyOn(global.console, 'error').mockImplementation(() => {});
    const error = null;
    const actual = getErrorMessage(error);
    expect(actual).toEqual('Unknown error.');
  });
});
