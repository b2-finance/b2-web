import { assert, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { WizardContext, WizardProvider } from './wizard-provider';

function TestComponent({
  test,
}: {
  test?: {
    values?: { name: string; value: unknown };
    data?: { name: string; data: unknown };
    valueInputName?: string;
  };
}) {
  const {
    values,
    setValues,
    handleValueChange,
    data,
    setData,
    stepIndex,
    prevStep,
    nextStep,
    reset,
  } = useContext(WizardContext);

  const v = Object.entries(values)?.[0];
  const d = Object.entries(data)?.[0];

  return (
    <>
      {v && <div data-testid="values">{`${v[0]}: ${v[1]}`}</div>}
      {d && <div data-testid="data">{`${d[0]}: ${d[1]}`}</div>}
      <div data-testid="step-index">{stepIndex}</div>
      {test?.values && (
        <button
          onClick={() => setValues(test.values!.name, test.values!.value)}
        >
          Values
        </button>
      )}
      {test?.valueInputName && (
        <input
          type="text"
          data-testid="value-input"
          name={test.valueInputName}
          onChange={handleValueChange}
        />
      )}
      {test?.data && (
        <button onClick={() => setData(test.data!.name, test.data!.data)}>
          Data
        </button>
      )}
      <button onClick={prevStep}>Prev</button>
      <button onClick={nextStep}>Next</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

describe(WizardProvider.name, () => {
  it('should render the expected value', () => {
    const name = 'value-name';
    const value = 'value';

    render(
      <WizardProvider initValues={{ [name]: value }}>
        <TestComponent />
      </WizardProvider>,
    );

    const actual = screen.getByTestId('values').innerHTML;
    expect(actual).toEqual(`${name}: ${value}`);
  });

  it('should render the expected data', () => {
    const name = 'data-name';
    const data = 'data';

    render(
      <WizardProvider initData={{ [name]: data }}>
        <TestComponent />
      </WizardProvider>,
    );

    const actual = screen.getByTestId('data').innerHTML;
    expect(actual).toEqual(`${name}: ${data}`);
  });

  it('should update the value as expected', async () => {
    const name = 'value-name';
    const value = 'value';

    const user = userEvent.setup();

    render(
      <WizardProvider>
        <TestComponent test={{ values: { name, value } }} />
      </WizardProvider>,
    );

    const button = screen.getByRole('button', { name: 'Values' });
    await user.click(button);

    const actual = screen.getByTestId('values').innerHTML;
    expect(actual).toEqual(`${name}: ${value}`);
  });

  it('should update the data as expected', async () => {
    const name = 'data-name';
    const data = 'data';

    const user = userEvent.setup();

    render(
      <WizardProvider>
        <TestComponent test={{ data: { name, data } }} />
      </WizardProvider>,
    );

    const button = screen.getByRole('button', { name: 'Data' });
    await user.click(button);

    const actual = screen.getByTestId('data').innerHTML;
    expect(actual).toEqual(`${name}: ${data}`);
  });

  it('should update the named value when input value changed', async () => {
    const valueInputName = 'test-value';
    const value = 'hello';

    const user = userEvent.setup();

    render(
      <WizardProvider>
        <TestComponent test={{ valueInputName }} />
      </WizardProvider>,
    );

    const input = screen.getByTestId('value-input');
    await user.type(input, value);

    const actual = screen.getByTestId('values').innerHTML;
    expect(actual).toEqual(`${valueInputName}: ${value}`);
  });

  it('should render the expected stepIndex', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>,
    );

    const actual = screen.getByTestId('step-index').innerHTML;
    expect(actual).toEqual('0');
  });

  it.each([[1], [2], [10]])(
    'should increment the stepIndex as expected (%s times)',
    async (n: number) => {
      const user = userEvent.setup();

      render(
        <WizardProvider>
          <TestComponent />
        </WizardProvider>,
      );

      const actual = screen.getByTestId('step-index');
      assert(actual.innerHTML === '0');

      const button = screen.getByRole('button', { name: 'Next' });
      for (let i = 0; i < n; i++) await user.click(button);

      expect(actual.innerHTML).toEqual(n.toString());
    },
  );

  it.each([[1], [2], [10]])(
    'should decrement the stepIndex as expected (%s times)',
    async (n: number) => {
      const user = userEvent.setup();

      render(
        <WizardProvider>
          <TestComponent />
        </WizardProvider>,
      );

      const next = screen.getByRole('button', { name: 'Next' });
      const prev = screen.getByRole('button', { name: 'Prev' });

      const offset = 1;

      for (let i = 0; i < n + offset; i++) await user.click(next);

      const actual = screen.getByTestId('step-index');
      expect(actual.innerHTML).toEqual((n + offset).toString());

      for (let i = 0; i < n; i++) await user.click(prev);

      expect(actual.innerHTML).toEqual(offset.toString());
    },
  );

  it('should not decrement the stepIndex below 0', async () => {
    const user = userEvent.setup();

    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>,
    );

    const button = screen.getByRole('button', { name: 'Prev' });
    await user.click(button);
    await user.click(button);

    const actual = screen.getByTestId('step-index').innerHTML;
    expect(actual).toEqual('0');
  });

  it('should reset the data, values, and stepIndex to initial state', async () => {
    const initValues = { key: 'value-name', value: 'init-value' };
    const initData = { key: 'data-name', data: 'init-data' };

    const test = {
      values: { name: 'value-name', value: 'foo' },
      data: { name: 'data-name', data: 'bar' },
    };

    const user = userEvent.setup();

    render(
      <WizardProvider
        initValues={{ [initValues.key]: initValues.value }}
        initData={{ [initData.key]: initData.data }}
      >
        <TestComponent test={test} />
      </WizardProvider>,
    );

    const valuesButton = screen.getByRole('button', { name: 'Values' });
    const dataButton = screen.getByRole('button', { name: 'Data' });
    const nextButton = screen.getByRole('button', { name: 'Next' });

    await user.click(valuesButton);
    await user.click(dataButton);
    await user.click(nextButton);

    const values = screen.getByTestId('values');
    const data = screen.getByTestId('data');
    const stepIndex = screen.getByTestId('step-index');

    expect(values.innerHTML).toEqual(
      `${test.values.name}: ${test.values.value}`,
    );
    expect(data.innerHTML).toEqual(`${test.data.name}: ${test.data.data}`);
    expect(stepIndex.innerHTML).toEqual('1');

    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await user.click(resetButton);

    expect(values.innerHTML).toEqual(`${initValues.key}: ${initValues.value}`);
    expect(data.innerHTML).toEqual(`${initData.key}: ${initData.data}`);
    expect(stepIndex.innerHTML).toEqual('0');
  });
});
