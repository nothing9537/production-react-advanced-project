import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesListLimit } from '../../selectors/articlesList';

interface FetchArticlesListParams {
  page: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListParams, ThunkConfig>(
  'articlesList/FetchArticlesList',
  async ({ page = 1 }, thunkApi) => {
    const { rejectWithValue, extra, getState } = thunkApi;

    const limit = getArticlesListLimit(getState());

    try {
      const response = await extra.API.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page: page,
          _limit: limit,
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('error-when-fetching-articles');
    }
  },
);
