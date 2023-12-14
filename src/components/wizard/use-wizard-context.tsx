import { useContext } from 'react';
import { WizardContext, WizardContextType } from './wizard-provider';

/**
 * Provides access to the {@link WizardContext}. Must be descendant of a
 * `WizardProvider` or a component wrapped with the `wizard` HOC.
 *
 * @returns A {@link WizardContextType}.
 */
export const useWizardContext = (): WizardContextType =>
  useContext(WizardContext);
