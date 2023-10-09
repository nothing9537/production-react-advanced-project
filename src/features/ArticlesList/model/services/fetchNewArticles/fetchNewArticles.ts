import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesListActions } from '../../slices/articlesListSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNewArticles = createAsyncThunk<void, void, ThunkConfig>(
  'articlesList/fetchNewArticles',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const state = getState();

    if (state?.articlesList) {
      const { hasMore, isLoading, page } = state.articlesList;

      if (hasMore && !isLoading) {
        const newPage = page + 1;

        dispatch(articlesListActions.setPage(newPage));
        dispatch(fetchArticlesList({
          page: newPage,
        }));
      }
    }
  },
);
