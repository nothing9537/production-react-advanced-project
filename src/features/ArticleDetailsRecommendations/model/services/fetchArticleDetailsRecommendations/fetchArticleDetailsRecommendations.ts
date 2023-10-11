import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleDetailsRecommendations = createAsyncThunk<Article[], void, ThunkConfig>(
  'articleDetails/fetchArticleDetailsRecommendations',
  async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
      const response = await extra.API.get<Article[]>('/articles', {
        params: {
          _limit: 5,
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
