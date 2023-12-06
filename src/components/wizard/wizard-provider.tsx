import { ChangeEvent, PropsWithChildren, createContext, useState } from 'react';
import { KeyValue } from '../../types';

/**
 * The type of {@link WizardContext}.
 */
export interface WizardContextType {
  /**
   * An object for storing values to be submitted by the wizard upon completion.
   *
   * @default {}
   */
  values: KeyValue;

  /**
   * Updates the named property in {@link values}.
   *
   * @param name The name of a property in {@link values}.
   * @param value The value of the named property.
   * @returns void.
   */
  setValues: (name: string, value: unknown) => void;

  /**
   * A change event handler for input values.
   *
   * @param event {@link ChangeEvent}
   * @returns void.
   */
  handleValueChange: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * An object for storing data separate from the wizard's submission values.
   *
   * @default {}
   */
  data: KeyValue;

  /**
   * Updates the named property in {@link data}.
   *
   * @param name The name of a property in {@link data}.
   * @param value The value of the named property.
   * @returns void.
   */
  setData: (name: string, value: unknown) => void;

  /**
   * The index of the currently active step.
   *
   * @default 0
   */
  stepIndex: number;

  /**
   * Decrements {@link stepIndex} by 1 (will not go below 0).
   *
   * @returns void.
   */
  prevStep: () => void;

  /**
   * Increments {@link stepIndex} by 1.
   *
   * @returns void.
   */
  nextStep: () => void;

  /**
   * Restores the initial state of {@link values}, {@link data}, and
   * {@link stepIndex}.
   *
   * @returns void.
   */
  reset: () => void;
}

/**
 * Maintains state and functions used by a wizard component.
 */
export const WizardContext = createContext<WizardContextType>({
  values: {},
  setValues: (_name, _value) => {},
  handleValueChange: (_event) => {},
  data: {},
  setData: (_name, _value) => {},
  stepIndex: 0,
  prevStep: () => {},
  nextStep: () => {},
  reset: () => {},
});

/**
 * Props for the {@link WizardProvider} component.
 */
export interface WizardProviderProps {
  initValues?: KeyValue;
  initData?: KeyValue;
}

/**
 * Returns a context provider for a {@link WizardContext}.
 *
 * @param props {@link WizardProviderProps}
 * @returns A context provider.
 */
export function WizardProvider({
  children,
  initValues = {},
  initData = {},
}: PropsWithChildren<WizardProviderProps>) {
  const [values, _setValues] = useState<KeyValue>(initValues);
  const [data, _setData] = useState<KeyValue>(initData);
  const [stepIndex, _setStepIndex] = useState<number>(0);

  const setValues = (name: string, value: unknown) =>
    _setValues((prev) => ({ ...prev, [name]: value }));

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValues(event.target?.name, event.target?.value);

  const setData = (name: string, value: unknown) =>
    _setData((prev) => ({ ...prev, [name]: value }));

  const prevStep = () => _setStepIndex((prev) => Math.max(prev - 1, 0));
  const nextStep = () => _setStepIndex((prev) => prev + 1);

  const reset = () => {
    _setValues(initValues);
    _setData(initData);
    _setStepIndex(0);
  };

  return (
    <WizardContext.Provider
      value={{
        values,
        setValues,
        handleValueChange,
        data,
        setData,
        stepIndex,
        prevStep,
        nextStep,
        reset,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}
