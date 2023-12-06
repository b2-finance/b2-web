import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthOtherContent } from './auth-other-content';

describe(AuthOtherContent.name, () => {
  it('should render the given children', () => {
    const childText = 'Hello';

    render(<AuthOtherContent>{childText}</AuthOtherContent>);

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });
});
