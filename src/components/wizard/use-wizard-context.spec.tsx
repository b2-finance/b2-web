import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { useWizardContext } from './use-wizard-context';
import {
  WizardContext,
  WizardContextType,
  WizardProvider,
} from './wizard-provider';

let mockWizardContext: WizardContextType;

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...(actual as any),
    useContext: (context: any) => {
      return context.displayName === WizardContext.displayName
        ? mockWizardContext
        : {};
    },
  };
});

function TestComponent() {
  const { values, data, stepIndex } = useWizardContext();
  return (
    <>
      <div>{Object.values(values)?.[0] as ReactNode}</div>
      <div>{Object.values(data)?.[0] as ReactNode}</div>
      <div>{stepIndex}</div>
    </>
  );
}

describe(useWizardContext.name, () => {
  it('should provide access to WizardContext', () => {
    mockWizardContext = {
      values: { value: 'test-value' },
      setValues: () => {},
      handleValueChange: () => {},
      data: { value: 'test-data' },
      setData: () => {},
      stepIndex: 42,
      prevStep: () => {},
      nextStep: () => {},
      reset: () => {},
    };

    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>,
    );

    const values = screen.getByText(mockWizardContext.values.value as string);
    const data = screen.getByText(mockWizardContext.data.value as string);
    const stepIndex = screen.getByText(mockWizardContext.stepIndex);

    expect(values).toBeInTheDocument();
    expect(data).toBeInTheDocument();
    expect(stepIndex).toBeInTheDocument();
  });
});
