import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('testing counter value', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    expect(screen.getByTestId('counter-value')).toHaveTextContent('10');
  });

  test('testing increment value', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    userEvent.click(screen.getByTestId('increment-button'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('11');
  });

  test('testing decrement value', () => {
    ComponentRender(<Counter />, {
      initialState: { counter: { value: 10 } },
    });
    userEvent.click(screen.getByTestId('decrement-button'));
    expect(screen.getByTestId('counter-value')).toHaveTextContent('9');
  });
});
