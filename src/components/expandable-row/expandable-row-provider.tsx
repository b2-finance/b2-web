import { PropsWithChildren, createContext, useState } from 'react';
import { KeyValue } from '../../types';

/**
 * The type of {@link ExpandableRowContext}.
 */
export interface ExpandableRowContextType {
  /**
   * True when in the expanded state, and false when collapsed.
   */
  expanded: boolean;

  /**
   * True when in the editing state, and false when not.
   */
  editing: boolean;

  /**
   * An object containing the updated values of the row.
   */
  updates: KeyValue;

  /**
   * A function that toggles `expanded` when `editing` is false.
   *
   * @returns void.
   */
  handleRowClick: () => void;

  /**
   * Opens edit mode and initializes the `updates` object with `initUpdates`.
   *
   * @param event A change event.
   * @param initUpdates An object to initialize `updates`.
   * @returns void.
   */
  openEditMode: (event: any, initUpdates?: KeyValue) => void;

  /**
   * Closes edit mode without saving.
   *
   * @returns void.
   */
  cancelEditMode: () => void;

  /**
   * Updates the named property in `updates`.
   *
   * @param name The name of a property in `updates`.
   * @param value The value of the named property.
   * @returns void.
   */
  handleChange: (name: string, value: unknown) => void;
}

/**
 * Maintains state and functions used by an expandable table row component.
 */
export const ExpandableRowContext = createContext<ExpandableRowContextType>({
  expanded: false,
  editing: false,
  updates: {},
  handleRowClick: () => {},
  openEditMode: (_event: any, _initUpdates?: KeyValue) => {},
  cancelEditMode: () => {},
  handleChange: (_name: string, _value: unknown) => {},
});

/**
 * Returns a context provider for an {@link ExpandableRowContext}.
 *
 * @param props Children
 * @returns A context provider.
 */
export function ExpandableRowProvider({ children }: PropsWithChildren) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [updates, setUpdates] = useState<KeyValue>({});

  const handleRowClick = () => {
    if (!editing) setExpanded((prev: boolean) => !prev);
  };

  const openEditMode = (event: any, initUpdates?: KeyValue) => {
    event.stopPropagation();
    setUpdates(initUpdates ?? {});

    if (!expanded) setExpanded(true);
    setEditing(true);
  };

  const cancelEditMode = () => {
    setEditing(false);
    setUpdates({});
  };

  const handleChange = (name: string, value: unknown) => {
    setUpdates((prev: KeyValue) => ({ ...prev, [name]: value }));
  };

  return (
    <ExpandableRowContext.Provider
      value={{
        expanded,
        editing,
        updates,
        handleRowClick,
        openEditMode,
        cancelEditMode,
        handleChange,
      }}
    >
      {children}
    </ExpandableRowContext.Provider>
  );
}
