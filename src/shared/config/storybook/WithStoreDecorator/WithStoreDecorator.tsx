import { Decorator } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { profileReducer } from 'entities/Profile/model/slice/profileSlice';
import { articleDetailsReducer } from 'entities/Article/model/slices/articleDetailsSlice';
import { addCommentReducer } from 'features/AddNewComment/model/slice/addCommentSlice';
import { articleDetailsCommentsReducer } from 'features/ArticleDetailsComments/model/slice/articleDetailsCommentsSlice';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentReducer,
  articleDetailsComments: articleDetailsCommentsReducer,
};

export const WithStoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator => function Render(Story) {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <Story />
    </StoreProvider>
  );
};
