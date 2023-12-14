import { useContext } from 'react';
import {
  ExpandableRowContext,
  ExpandableRowContextType,
} from './expandable-row-provider';

/**
 * Provides access to the {@link ExpandableRowContext}. Must be descendant of
 * an `ExpandableRowProvider` or a component wrapped with the `expandableRow`
 * HOC.
 *
 * @returns An {@link ExpandableRowContextType}.
 */
export const useExpandableRowContext = (): ExpandableRowContextType =>
  useContext(ExpandableRowContext);
