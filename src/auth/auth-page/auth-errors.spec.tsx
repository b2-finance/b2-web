import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthErrors } from './auth-errors';

describe(AuthErrors.name, () => {
  it.each([[['foo']], [['foo', 'bar']], [['foo', 'bar', 'baz']]])(
    'should render the given errors',
    (errors: string[]) => {
      render(<AuthErrors errors={errors} />);

      errors.forEach((e) => {
        const error = screen.getByText(e);
        expect(error).toBeInTheDocument();
      });
    },
  );
});
