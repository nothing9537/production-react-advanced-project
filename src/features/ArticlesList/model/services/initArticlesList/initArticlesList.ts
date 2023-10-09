import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesListActions } from '../../slices/articlesListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesList = createAsyncThunk<void, void, ThunkConfig>(
  'articlesList/InitArticlesList',
  async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi;

    const inited = getState().articlesList?._inited;

    if (!inited) {
      dispatch(articlesListActions.initArticlesList());
      dispatch(fetchArticlesList({
        page: 1,
      }));
    }
  },
);
