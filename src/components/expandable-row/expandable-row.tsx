import { ExpandableRowProvider } from './expandable-row-provider';

/**
 * A Higher Order Component that wraps the given component in an
 * {@link ExpandableRowProvider}.
 *
 * @example
 * ```
 * function RowComponent() {
 *  const { ... } = useExpandableRowContext();
 *  ...
 * }
 * export const ExpandableRowComponent = expandableRow(RowComponent);
 * ```
 *
 * @param WrappedComponent A React component that acts as a table row.
 * @returns The `WrappedComponent` wrapped in an {@link ExpandableRowProvider}.
 */
export function expandableRow<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return (props: P) => {
    return (
      <ExpandableRowProvider>
        <WrappedComponent {...props} />
      </ExpandableRowProvider>
    );
  };
}
