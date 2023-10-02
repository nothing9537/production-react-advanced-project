import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { profileReducer } from 'entities/Profile/model/slice/profileSlice';
import { articleDetailsReducer } from 'entities/Article/model/slices/articleDetailsSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
};

export const WithStoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator => function Render(Story) {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <Story />
    </StoreProvider>
  );
};
