import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { parseQueryParams } from '@/shared/lib/queryParams/queryParams';
import { articlesListActions } from '../../slices/articlesListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesList = createAsyncThunk<void, string, ThunkConfig>(
  'articlesList/InitArticlesList',
  async (searchString, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    const inited = getState().articlesList?._inited;

    if (!inited) {
      const searchParams = parseQueryParams(searchString);

      Object.entries(searchParams).forEach(([searchParam, value]) => {
        Object.entries(articlesListActions).forEach(([actionName, action]) => {
          if (actionName.toLowerCase().includes(searchParam.toLowerCase())) {
            dispatch(action(value as never));
          }
        });
      });

      dispatch(articlesListActions.initArticlesList());
      dispatch(fetchArticlesList({}));
    }
  },
);
