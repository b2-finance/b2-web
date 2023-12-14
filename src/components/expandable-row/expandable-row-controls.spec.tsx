import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ExpandableRowControls,
  ExpandableRowControlsProps,
} from './expandable-row-controls';
import { ExpandableRowProvider } from './expandable-row-provider';

const mockCancelEditMode = vi.fn();

vi.mock('./use-expandable-row-context', () => ({
  useExpandableRowContext: () => ({
    cancelEditMode: mockCancelEditMode,
  }),
}));

describe(ExpandableRowControls.name, () => {
  describe('Cancel button', () => {
    it.each([
      [undefined, false],
      [false, false],
      [true, true],
      [{}, true],
      [{ label: '' }, true],
      [{ label: ' ' }, true],
      [{ label: 'foo' }, true],
    ])(
      'should render the cancel button when expected (cancel=%s)',
      (cancel: ExpandableRowControlsProps['cancel'], shouldRender: boolean) => {
        render(
          <ExpandableRowProvider>
            <ExpandableRowControls cancel={cancel} />
          </ExpandableRowProvider>,
        );

        const button = screen.queryByRole('button', {
          name: typeof cancel === 'boolean' ? 'Cancel' : cancel?.label?.trim(),
        });

        if (shouldRender) expect(button).toBeInTheDocument();
        else expect(button).not.toBeInTheDocument();
      },
    );

    it('should call cancelEditMode() when cancel button clicked', async () => {
      const user = userEvent.setup();

      render(
        <ExpandableRowProvider>
          <ExpandableRowControls cancel={true} />
        </ExpandableRowProvider>,
      );

      const button = screen.getByRole('button', { name: 'Cancel' });
      await user.click(button);

      await waitFor(() => expect(mockCancelEditMode).toHaveBeenCalledOnce());
    });

    it('should call cancel.fn() when cancel button clicked', async () => {
      const mockFn = vi.fn();
      const user = userEvent.setup();

      render(
        <ExpandableRowProvider>
          <ExpandableRowControls cancel={{ fn: mockFn }} />
        </ExpandableRowProvider>,
      );

      const button = screen.getByRole('button', { name: 'Cancel' });
      await user.click(button);

      await waitFor(() => expect(mockFn).toHaveBeenCalledOnce());
    });
  });

  describe('Save button', () => {
    it.each([
      [undefined, false],
      [{ fn: () => {} }, true],
      [{ label: '', fn: () => {} }, true],
      [{ label: ' ', fn: () => {} }, true],
      [{ label: 'foo', fn: () => {} }, true],
    ])(
      'should render the save button when expected (save=%s)',
      (save: ExpandableRowControlsProps['save'], shouldRender: boolean) => {
        render(
          <ExpandableRowProvider>
            <ExpandableRowControls save={save} />
          </ExpandableRowProvider>,
        );

        const button = screen.queryByRole('button', {
          name: save?.label?.trim() ?? 'Save',
        });

        if (shouldRender) expect(button).toBeInTheDocument();
        else expect(button).not.toBeInTheDocument();
      },
    );

    it('should call save.fn() when save button clicked', async () => {
      const mockFn = vi.fn();
      const user = userEvent.setup();

      render(
        <ExpandableRowProvider>
          <ExpandableRowControls save={{ fn: mockFn }} />
        </ExpandableRowProvider>,
      );

      const button = screen.getByRole('button', { name: 'Save' });
      await user.click(button);

      await waitFor(() => expect(mockFn).toHaveBeenCalledOnce());
    });
  });

  describe('Remove button', () => {
    it.each([
      [undefined, false],
      [{ fn: () => {} }, true],
      [{ label: '', fn: () => {} }, true],
      [{ label: ' ', fn: () => {} }, true],
      [{ label: 'foo', fn: () => {} }, true],
    ])(
      'should render the remove button when expected (remove=%s)',
      (remove: ExpandableRowControlsProps['remove'], shouldRender: boolean) => {
        render(
          <ExpandableRowProvider>
            <ExpandableRowControls remove={remove} />
          </ExpandableRowProvider>,
        );

        const button = screen.queryByRole('button', {
          name: remove?.label?.trim(),
        });

        if (shouldRender) expect(button).toBeInTheDocument();
        else expect(button).not.toBeInTheDocument();
      },
    );

    it('should call remove.fn() when remove button clicked', async () => {
      const mockFn = vi.fn();
      const user = userEvent.setup();

      render(
        <ExpandableRowProvider>
          <ExpandableRowControls remove={{ label: 'Remove', fn: mockFn }} />
        </ExpandableRowProvider>,
      );

      const button = screen.getByRole('button', { name: 'Remove' });
      await user.click(button);

      await waitFor(() => expect(mockFn).toHaveBeenCalledOnce());
    });
  });
});
