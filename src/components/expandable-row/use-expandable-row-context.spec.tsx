import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ExpandableRowContext,
  ExpandableRowContextType,
  ExpandableRowProvider,
} from './expandable-row-provider';
import { useExpandableRowContext } from './use-expandable-row-context';

let mockExpandableRowContext: ExpandableRowContextType;

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...(actual as any),
    useContext: (context: any) => {
      return context.displayName === ExpandableRowContext.displayName
        ? mockExpandableRowContext
        : {};
    },
  };
});

function TestComponent() {
  const {
    expanded,
    editing,
    updates,
    handleRowClick,
    openEditMode,
    cancelEditMode,
    handleChange,
  } = useExpandableRowContext();

  const u = Object.entries(updates)?.[0];

  return (
    <>
      <div data-testid="expanded">{expanded.toString()}</div>
      <div data-testid="editing">{editing.toString()}</div>
      <div data-testid="updates">{`${u[0]}: ${u[1]}`}</div>
      <button onClick={handleRowClick}>Click</button>
      <button onClick={openEditMode}>Edit</button>
      <button onClick={cancelEditMode}>Cancel</button>
      <button onClick={() => handleChange('', null)}>Change</button>
    </>
  );
}

describe(useExpandableRowContext.name, () => {
  it('should provide access to ExpandableRowContext', async () => {
    const mockHandleRowClick = vi.fn();
    const mockOpenEditMode = vi.fn();
    const mockCancelEditMode = vi.fn();
    const mockHandleChange = vi.fn();

    mockExpandableRowContext = {
      expanded: true,
      editing: true,
      updates: { foo: 'bar' },
      handleRowClick: mockHandleRowClick,
      openEditMode: mockOpenEditMode,
      cancelEditMode: mockCancelEditMode,
      handleChange: mockHandleChange,
    };

    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const expanded = screen.getByTestId('expanded').innerHTML;
    expect(expanded).toEqual(mockExpandableRowContext.expanded.toString());

    const editing = screen.getByTestId('editing').innerHTML;
    expect(editing).toEqual(mockExpandableRowContext.editing.toString());

    const updates = screen.getByTestId('updates').innerHTML;
    expect(updates).toEqual('foo: bar');

    const click = screen.getByRole('button', { name: 'Click' });
    await user.click(click);
    await waitFor(() => expect(mockHandleRowClick).toHaveBeenCalledOnce());

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);
    await waitFor(() => expect(mockOpenEditMode).toHaveBeenCalledOnce());

    const cancel = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancel);
    await waitFor(() => expect(mockCancelEditMode).toHaveBeenCalledOnce());

    const change = screen.getByRole('button', { name: 'Change' });
    await user.click(change);
    await waitFor(() => expect(mockHandleChange).toHaveBeenCalledOnce());
  });
});
