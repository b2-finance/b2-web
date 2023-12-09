import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WizardControls, WizardControlsProps } from './wizard-controls';
import { WizardProvider } from './wizard-provider';

let mockStepIndex = 0;
const mockPrevStep = vi.fn();
const mockNextStep = vi.fn();

vi.mock('./use-wizard-context', () => ({
  useWizardContext: () => ({
    stepIndex: mockStepIndex,
    prevStep: mockPrevStep,
    nextStep: mockNextStep,
  }),
}));

describe(WizardControls.name, () => {
  afterEach(() => {
    mockStepIndex = 0;
  });

  describe('Prev button', () => {
    it.each([
      [true, 0, false],
      [true, 1, true],
      [false, 0, false],
      [false, 1, false],
      [undefined, 0, false],
      [undefined, 1, false],
      [{ label: 'prev-button' }, 0, false],
      [{ label: 'prev-button' }, 1, true],
    ])(
      'should render the prev button when expected (prev=%s, stepIndex=%s)',
      (
        prev: WizardControlsProps['prev'],
        stepIndex: number,
        shouldRender: boolean,
      ) => {
        mockStepIndex = stepIndex;

        render(
          <WizardProvider>
            <WizardControls prev={prev} />
          </WizardProvider>,
        );

        const button = screen.queryByRole('button', {
          name:
            typeof prev === 'boolean' || typeof prev === 'undefined'
              ? 'Back'
              : prev?.label,
        });

        if (shouldRender) expect(button).not.toBeNull();
        else expect(button).toBeNull();
      },
    );

    it('should call prevStep() when prev button clicked', async () => {
      const user = userEvent.setup();
      mockStepIndex = 1;

      render(
        <WizardProvider>
          <WizardControls prev={true} />
        </WizardProvider>,
      );

      const button = screen.getByRole('button', { name: 'Back' });
      await user.click(button);

      await waitFor(() => expect(mockPrevStep).toHaveBeenCalledOnce());
    });
  });

  describe('Next button', () => {
    it.each([
      [true, undefined, true],
      [true, { fn: () => {} }, false],
      [false, undefined, false],
      [false, { fn: () => {} }, false],
      [undefined, undefined, false],
      [undefined, { fn: () => {} }, false],
      [{ label: 'next-button' }, undefined, true],
      [{ label: 'next-button' }, { fn: () => {} }, false],
    ])(
      'should render the next button when expected (next=%s, submit=%s)',
      (
        next: WizardControlsProps['next'],
        submit: WizardControlsProps['submit'],
        shouldRender: boolean,
      ) => {
        render(
          <WizardProvider>
            <WizardControls next={next} submit={submit} />
          </WizardProvider>,
        );

        const button = screen.queryByRole('button', {
          name:
            typeof next === 'boolean' || typeof next === 'undefined'
              ? 'Next'
              : next?.label,
        });

        if (shouldRender) expect(button).not.toBeNull();
        else expect(button).toBeNull();
      },
    );

    it.each([
      [true, true, false],
      [true, false, true],
      [true, undefined, true],
      [{ label: 'next-button' }, true, false],
      [{ label: 'next-button' }, false, true],
      [{ label: 'next-button' }, undefined, true],
    ])(
      'should disable the next button when expected (next=%s, isValid=%s)',
      (
        next: WizardControlsProps['next'],
        isValid: boolean | undefined,
        shouldDisable: boolean,
      ) => {
        render(
          <WizardProvider>
            <WizardControls next={next} isValid={isValid} />
          </WizardProvider>,
        );

        const button = screen.queryByRole('button', {
          name:
            typeof next === 'boolean' || typeof next === 'undefined'
              ? 'Next'
              : next?.label,
        });

        if (shouldDisable) expect(button).toBeDisabled();
        else expect(button).not.toBeDisabled();
      },
    );

    it('should call nextStep() when next button clicked', async () => {
      const user = userEvent.setup();

      render(
        <WizardProvider>
          <WizardControls next={true} isValid={true} />
        </WizardProvider>,
      );

      const button = screen.getByRole('button', { name: 'Next' });
      await user.click(button);

      await waitFor(() => expect(mockNextStep).toHaveBeenCalledOnce());
    });
  });

  describe('Submit button', () => {
    it.each([
      [true, undefined, false],
      [true, { fn: () => {} }, true],
      [false, undefined, false],
      [false, { fn: () => {} }, true],
      [undefined, undefined, false],
      [undefined, { fn: () => {} }, true],
      [{ label: 'next-button' }, undefined, false],
      [{ label: 'next-button' }, { fn: () => {} }, true],
    ])(
      'should render the submit button when expected (next=%s, submit=%s)',
      (
        next: WizardControlsProps['next'],
        submit: WizardControlsProps['submit'],
        shouldRender: boolean,
      ) => {
        render(
          <WizardProvider>
            <WizardControls next={next} submit={submit} />
          </WizardProvider>,
        );

        const submitButton = screen.queryByRole('button', {
          name: submit?.label ?? 'Submit',
        });

        const nextButton = screen.queryByRole('button', {
          name:
            typeof next === 'boolean' || typeof next === 'undefined'
              ? 'Next'
              : next?.label,
        });

        if (shouldRender) {
          expect(submitButton).not.toBeNull();
          expect(nextButton).toBeNull();
        } else {
          expect(submitButton).toBeNull();
          next && expect(nextButton).not.toBeNull();
        }
      },
    );

    it.each([
      [{ fn: () => {} }, true, false],
      [{ fn: () => {} }, false, true],
      [{ fn: () => {} }, undefined, true],
    ])(
      'should disable the submit button when expected (submit=%s, isValid=%s)',
      (
        submit: WizardControlsProps['submit'],
        isValid: boolean | undefined,
        shouldDisable: boolean,
      ) => {
        render(
          <WizardProvider>
            <WizardControls submit={submit} isValid={isValid} />
          </WizardProvider>,
        );

        const button = screen.queryByRole('button', {
          name: submit?.label ?? 'Submit',
        });

        if (shouldDisable) expect(button).toBeDisabled();
        else expect(button).not.toBeDisabled();
      },
    );

    it('should call submit.fn() when submit button clicked', async () => {
      const user = userEvent.setup();
      const mockSubmitFn = vi.fn();

      render(
        <WizardProvider>
          <WizardControls submit={{ fn: mockSubmitFn }} isValid={true} />
        </WizardProvider>,
      );

      const button = screen.getByRole('button', { name: 'Submit' });
      await user.click(button);

      await waitFor(() => expect(mockSubmitFn).toHaveBeenCalledOnce());
    });
  });
});
