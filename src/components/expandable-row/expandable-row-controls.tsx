import { useExpandableRowContext } from './use-expandable-row-context';
import TrashIcon from '../icons/trash-icon';
import { Button } from '../button/button';

/**
 * Props for the {@link ExpandableRowControls} component.
 */
export interface ExpandableRowControlsProps {
  /**
   * CSS class selector(s) applied to the component.
   */
  className?: string;

  /**
   * Defines the properties of the cancel button. Leave undefined to omit
   * the cancel button.
   */
  cancel?:
    | boolean
    | {
        label?: string;
        className?: string;
        fn?: () => void;
      };

  /**
   * Defines the properties of the save button. Leave undefined to omit
   * the save button.
   */
  save?: {
    label?: string;
    className?: string;
    fn: () => void;
  };

  /**
   * Defines the properties of the remove button. Leave undefined to omit
   * the remove button.
   */
  remove?: {
    label?: string;
    className?: string;
    fn: () => void;
  };
}

/**
 * Contains buttons for controlling an expandable row. Must be descendant of an
 * `ExpandableRowProvider` or a component wrapped with the `expandableRow` HOC.
 *
 * @param props {@link ExpandableRowControlsProps}
 * @returns A JSX element.
 */
export function ExpandableRowControls({
  className,
  cancel,
  save,
  remove,
}: ExpandableRowControlsProps) {
  const { cancelEditMode } = useExpandableRowContext();
  const customCancel = cancel && typeof cancel !== 'boolean';
  const useTrash = remove?.label === null || remove?.label === undefined;

  return (
    <div className={className}>
      {cancel && (
        <Button
          className={customCancel ? cancel.className : undefined}
          onClick={() => {
            customCancel && cancel.fn && cancel.fn();
            cancelEditMode();
          }}
        >
          {(customCancel ? cancel.label : undefined) ?? 'Cancel'}
        </Button>
      )}
      {save && (
        <Button
          className={save.className}
          onClick={() => {
            save.fn();
            cancelEditMode();
          }}
        >
          {save.label ?? 'Save'}
        </Button>
      )}
      {remove && (
        <Button
          className={remove.className}
          onClick={remove.fn}
          style={
            useTrash
              ? {
                  border: 'none',
                  backgroundColor: 'transparent',
                  height: '100%',
                  verticalAlign: 'middle',
                }
              : undefined
          }
        >
          {remove.label ?? <TrashIcon />}
        </Button>
      )}
    </div>
  );
}
