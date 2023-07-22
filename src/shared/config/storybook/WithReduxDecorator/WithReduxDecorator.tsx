import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from 'redux';

export const WithReduxDecorator = (state: DeepPartial<StateSchema>): Decorator => function Render(Story) {
  return (
    <StoreProvider initialState={state}>
      <Story />
    </StoreProvider>
  );
};
