import { useWizardContext } from './use-wizard-context';
import { Button } from '../button/button';

/**
 * Props for a button in the {@link WizardControls} component.
 */
export interface WizardControlButtonProps {
  label?: string;
  className?: string;
}

/**
 * Props for the {@link WizardControls} component.
 */
export interface WizardControlsProps {
  className?: string;
  isValid?: boolean;
  prev?: WizardControlButtonProps | boolean;
  next?: WizardControlButtonProps | boolean;
  submit?: WizardControlButtonProps & { fn: () => void };
}

/**
 * Contains buttons for traversing the steps of a wizard. Must be descendant
 * of a `WizardProvider` or a component wrapped with the `wizard` HOC.
 *
 * Rendering of the buttons is determined by:
 *
 * - `prev`: Rendered when `prev` is defined and `stepIndex` is > 0;
 * - `next`: Rendered when `next` is defined and `submit` is undefined.
 * - `submit`: Rendered when `submit` is defined.
 *
 * @param props {@link WizardControlsProps}
 * @returns A JSX element.
 */
export function WizardControls({
  className,
  isValid,
  prev,
  next,
  submit,
}: WizardControlsProps) {
  const { stepIndex, prevStep, nextStep } = useWizardContext();
  const customPrev = typeof prev !== 'boolean';
  const customNext = typeof next !== 'boolean';

  return (
    <div className={className}>
      {prev && stepIndex > 0 && (
        <Button
          className={customPrev ? prev.className : undefined}
          onClick={prevStep}
        >
          {(customPrev && prev.label) || 'Back'}
        </Button>
      )}
      {next && !submit && (
        <Button
          className={customNext ? next.className : undefined}
          onClick={nextStep}
          disabled={!isValid}
        >
          {(customNext && next.label) || 'Next'}
        </Button>
      )}
      {submit && (
        <Button
          className={submit.className}
          onClick={submit.fn}
          disabled={!isValid}
        >
          {submit.label ?? 'Submit'}
        </Button>
      )}
    </div>
  );
}
