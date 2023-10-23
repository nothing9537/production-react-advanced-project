import { Decorator } from '@storybook/react';

import { loginReducer } from '@/features/AuthByUserName/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { addCommentReducer } from '@/features/AddNewComment/testing';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage/testing';
import { articlesListReducer } from '@/pages/ArticlesPage/testing';
import { articleDetailsReducer } from '@/entities/Article/testing';

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
