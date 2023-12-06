import { useContext } from 'react';
import { WizardContext } from './wizard-provider';

/**
 * Syntactic sugar for `useContext(WizardContext)`. Must be descendant of a
 * `WizardProvider` or a component wrapped with the `wizard` HOC.
 *
 * @returns A `WizardContextType`.
 */
export const useWizardContext = () => useContext(WizardContext);
