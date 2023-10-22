import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorPage } from './error-page';

let mockError: unknown;

vi.mock('react-router-dom', () => ({
  useRouteError: () => mockError,
}));

vi.mock('../get-error-message/get-error-message', () => ({
  getErrorMessage: (_: unknown) => mockError,
}));

describe(ErrorPage.name, () => {
  afterEach(() => {
    mockError = null;
  });

  it('should display the error message', () => {
    mockError = 'This is an error.';
    render(<ErrorPage />);
    const error = screen.getByText(mockError as string);
    expect(error).toBeInTheDocument();
  });
});
