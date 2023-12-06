import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthPage } from './auth-page';

describe(AuthPage.name, () => {
  it('should render the given children', () => {
    const childText = 'Hello';

    render(<AuthPage>{childText}</AuthPage>);

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });
});
