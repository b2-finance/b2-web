import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthForm } from './auth-form';

describe(AuthForm.name, () => {
  it('should render the given children', () => {
    const childText = 'Hello';

    render(<AuthForm title="foo">{childText}</AuthForm>);

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });

  it('should render the given title', () => {
    const titleText = 'foo';

    render(<AuthForm title={titleText} />);

    const title = screen.getByRole('heading', { name: titleText });
    expect(title).toBeInTheDocument();
  });
});
