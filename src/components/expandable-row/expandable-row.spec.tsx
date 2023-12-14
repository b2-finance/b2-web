import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';
import { expandableRow } from './expandable-row';
import { useExpandableRowContext } from './use-expandable-row-context';

let mockExpanded: boolean;
let mockEditing: boolean;
let mockUpdates: any;
const mockHandleRowClick = vi.fn();
const mockOpenEditMode = vi.fn();
const mockCancelEditMode = vi.fn();
const mockHandleChange = vi.fn();

vi.mock('./use-expandable-row-context', () => ({
  useExpandableRowContext: () => ({
    expanded: mockExpanded,
    editing: mockEditing,
    updates: mockUpdates,
    handleRowClick: mockHandleRowClick,
    openEditMode: mockOpenEditMode,
    cancelEditMode: mockCancelEditMode,
    handleChange: mockHandleChange,
  }),
}));

function WrappedComponent({ children }: PropsWithChildren) {
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
      {children}
    </>
  );
}
const TestComponent = expandableRow(WrappedComponent);

describe(expandableRow.name, () => {
  afterEach(() => {
    mockExpanded = false;
    mockEditing = false;
    mockUpdates = {};
  });

  it('should render the wrapped component', () => {
    const childText = 'Hello';
    mockExpanded = true;
    mockEditing = true;
    mockUpdates = { foo: 'bar' };

    render(<TestComponent>{childText}</TestComponent>);

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });

  it('should provide wrapped component and descendants access to ExpandableRowContext', async () => {
    mockExpanded = true;
    mockEditing = true;
    mockUpdates = { foo: 'bar' };

    const user = userEvent.setup();

    render(<TestComponent />);

    const expanded = screen.getByTestId('expanded').innerHTML;
    expect(expanded).toEqual(mockExpanded.toString());

    const editing = screen.getByTestId('editing').innerHTML;
    expect(editing).toEqual(mockEditing.toString());

    const updates = screen.getByTestId('updates').innerHTML;
    const update = Object.entries(mockUpdates)?.[0];
    expect(updates).toEqual(`${update[0]}: ${update[1]}`);

    const handleRowClick = screen.getByRole('button', { name: 'Click' });
    const openEditMode = screen.getByRole('button', { name: 'Edit' });
    const cancelEditMode = screen.getByRole('button', { name: 'Cancel' });
    const handleChange = screen.getByRole('button', { name: 'Change' });

    await user.click(handleRowClick);
    await user.click(openEditMode);
    await user.click(cancelEditMode);
    await user.click(handleChange);

    await waitFor(() => {
      expect(mockHandleRowClick).toHaveBeenCalledOnce();
      expect(mockOpenEditMode).toHaveBeenCalledOnce();
      expect(mockCancelEditMode).toHaveBeenCalledOnce();
      expect(mockHandleChange).toHaveBeenCalledOnce();
    });
  });
});
