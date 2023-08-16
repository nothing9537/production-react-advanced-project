import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { MappedReducer } from 'app/providers/StoreProvider/config/StateChema';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { DeepPartial } from 'redux';

const defaultAsyncReducers: DeepPartial<MappedReducer> = {
  loginForm: loginReducer,
  profile: profileReducer,
};

export const WithStoreDecorator = (state: DeepPartial<StateSchema>): Decorator => function Render(Story) {
  return (
    <StoreProvider initialState={state} asyncReducers={defaultAsyncReducers}>
      <Story />
    </StoreProvider>
  );
};
