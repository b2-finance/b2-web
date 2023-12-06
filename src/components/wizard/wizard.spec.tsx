import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';
import { wizard } from './wizard';
import { useWizardContext } from './use-wizard-context';

let mockStepIndex: number;
const mockPrevStep = vi.fn();
const mockNextStep = vi.fn();

vi.mock('./use-wizard-context', () => ({
  useWizardContext: () => ({
    stepIndex: mockStepIndex,
    prevStep: mockPrevStep,
    nextStep: mockNextStep,
  }),
}));

function WrappedComponent({ children }: PropsWithChildren) {
  const { stepIndex, prevStep, nextStep } = useWizardContext();
  return (
    <>
      <div data-testid="step-index">{stepIndex}</div>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
      {children}
    </>
  );
}
const TestComponent = wizard(WrappedComponent);

describe(wizard.name, () => {
  afterEach(() => {
    mockStepIndex = 0;
  });

  it('should render the wrapped component', () => {
    const childText = 'Hello';

    render(<TestComponent>{childText}</TestComponent>);

    const child = screen.getByText(childText);
    expect(child).toBeInTheDocument();
  });

  it('should provide wrapped component and descendants access to WizardContext', async () => {
    mockStepIndex = 42;

    const user = userEvent.setup();

    render(<TestComponent />);

    const stepIndex = screen.getByTestId('step-index');
    expect(stepIndex.innerHTML).toEqual(mockStepIndex.toString());

    const nextButton = screen.getByRole('button', { name: 'Next' });
    const prevButton = screen.getByRole('button', { name: 'Back' });

    await user.click(nextButton);
    await user.click(prevButton);

    await waitFor(() => {
      expect(mockNextStep).toHaveBeenCalledOnce();
      expect(mockPrevStep).toHaveBeenCalledOnce();
    });
  });
});
