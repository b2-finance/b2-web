import { ComponentType } from 'react';
import { WizardProvider } from './wizard-provider';

/**
 * A Higher Order Component that wraps the given component in a
 * {@link WizardProvider}.
 *
 * @example
 * ```
 * function Component() {
 *  const { ... } = useWizardContext();
 *  ...
 * }
 * export const WizardComponent = wizard(Component);
 * ```
 *
 * @param WrappedComponent A React component that acts as a wizard.
 * @returns The `WrappedComponent` wrapped in a {@link WizardProvider}.
 */
export function wizard<P extends object>(WrappedComponent: ComponentType<P>) {
  return (props: P) => {
    return (
      <WizardProvider>
        <WrappedComponent {...props} />
      </WizardProvider>
    );
  };
}
