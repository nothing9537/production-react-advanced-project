import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data;
export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading;
export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;
export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.user.id === user.id;
  },
);
