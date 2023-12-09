import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { MemoryRouter } from 'react-router-dom';

describe(Header.name, () => {
  it('should render a navigation component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});
