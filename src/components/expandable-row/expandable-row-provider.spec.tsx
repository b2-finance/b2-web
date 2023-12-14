import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import {
  ExpandableRowContext,
  ExpandableRowProvider,
} from './expandable-row-provider';
import { KeyValue } from '../../types';

function TestComponent({ initUpdates }: { initUpdates?: KeyValue }) {
  const {
    expanded,
    editing,
    updates,
    handleRowClick,
    openEditMode,
    cancelEditMode,
    handleChange,
  } = useContext(ExpandableRowContext);

  const u = Object.entries(updates)?.[0];

  return (
    <>
      <div data-testid="expanded">{expanded.toString()}</div>
      <div data-testid="editing">{editing.toString()}</div>
      <table>
        <tbody>
          <tr data-testid="top-row" onClick={handleRowClick}>
            <td>
              {editing && initUpdates ? (
                <input
                  type="text"
                  name={u[0]}
                  value={updates[u[0]] as string}
                  onChange={(event) =>
                    handleChange(event.target.name, event.target.value)
                  }
                />
              ) : (
                'A'
              )}
            </td>
          </tr>
          {expanded && (
            <tr data-testid="expanded-row">
              <td>
                <button
                  type="button"
                  onClick={
                    editing
                      ? cancelEditMode
                      : (event) => openEditMode(event, initUpdates)
                  }
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

describe(ExpandableRowProvider.name, () => {
  it('should expand the row when handleRowClick() called and expanded=false', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const expanded = screen.getByTestId('expanded');
    expect(expanded.innerHTML).toEqual('false');

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    await waitFor(() => {
      const expandedRow = screen.getByTestId('expanded-row');
      expect(expandedRow).toBeInTheDocument();
      expect(expanded.innerHTML).toEqual('true');
    });
  });

  it('should collapse the row when handleRowClick() called and expanded=true and editing=false', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const expanded = screen.getByTestId('expanded');
    const editing = screen.getByTestId('editing');
    expect(expanded.innerHTML).toEqual('false');

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    await waitFor(() => {
      const expandedRow = screen.getByTestId('expanded-row');
      expect(expandedRow).toBeInTheDocument();
      expect(expanded.innerHTML).toEqual('true');
      expect(editing.innerHTML).toEqual('false');
    });

    await user.click(topRow);

    await waitFor(() => {
      const expandedRow = screen.queryByTestId('expanded-row');
      expect(expandedRow).not.toBeInTheDocument();
      expect(expanded.innerHTML).toEqual('false');
      expect(editing.innerHTML).toEqual('false');
    });
  });

  it('should open edit mode when openEditMode() called', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const editing = screen.getByTestId('editing');
    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    await waitFor(() => expect(editing.innerHTML).toEqual('false'));

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);

    await waitFor(() => expect(editing.innerHTML).toEqual('true'));
  });

  it('should initialize the updates object when openEditMode() called', async () => {
    const user = userEvent.setup();

    const initUpdates = { a: 'foo' };

    render(
      <ExpandableRowProvider>
        <TestComponent initUpdates={initUpdates} />
      </ExpandableRowProvider>,
    );

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);

    const input = screen.getByRole('textbox');

    await waitFor(() => expect(input).toHaveValue(initUpdates.a));
  });

  it('should update the updates object when handleChange() called', async () => {
    const user = userEvent.setup();

    const initUpdates = { a: 'foo' };
    const update = 'bar';

    render(
      <ExpandableRowProvider>
        <TestComponent initUpdates={initUpdates} />
      </ExpandableRowProvider>,
    );

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);

    const input = screen.getByRole('textbox');
    await user.type(input, update);

    await waitFor(() => expect(input).toHaveValue(`${initUpdates.a}${update}`));
  });

  it('should close edit mode when cancelEditMode() called', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);

    const editing = screen.getByTestId('editing');
    await waitFor(() => expect(editing.innerHTML).toEqual('true'));

    const cancel = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancel);

    await waitFor(() => expect(editing.innerHTML).toEqual('false'));
  });

  it('should not collapse the row when handleRowClick() called and expanded=true and editing=true', async () => {
    const user = userEvent.setup();

    render(
      <ExpandableRowProvider>
        <TestComponent />
      </ExpandableRowProvider>,
    );

    const expanded = screen.getByTestId('expanded');
    expect(expanded.innerHTML).toEqual('false');

    const topRow = screen.getByTestId('top-row');
    await user.click(topRow);

    const edit = screen.getByRole('button', { name: 'Edit' });
    await user.click(edit);

    await waitFor(() => {
      const editing = screen.getByTestId('editing');
      expect(editing.innerHTML).toEqual('true');
      expect(expanded.innerHTML).toEqual('true');
    });

    await user.click(topRow);
    await waitFor(() => expect(expanded.innerHTML).toEqual('true'));
  });
});
