import { Decorator } from '@storybook/react';
import { articlesListReducer } from '@/features/ArticlesList';
import { loginReducer } from '@/features/AuthByUserName';
import { profileReducer } from '@/features/EditableProfileCard';
import { addCommentReducer } from '@/features/AddNewComment';
import { articleDetailsCommentsReducer } from '@/features/ArticleDetailsComments';
import { articleDetailsReducer } from '@/entities/Article';
import { ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentReducer,
  articleDetailsComments: articleDetailsCommentsReducer,
  articlesList: articlesListReducer,
};

export const WithStoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator => function Render(Story) {
  return (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <Story />
    </StoreProvider>
  );
};
