import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig>(
  'articlesList/FetchArticlesList',
  async (_, thunkApi) => {
    const { rejectWithValue, extra } = thunkApi;

    try {
      const response = await extra.API.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
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
