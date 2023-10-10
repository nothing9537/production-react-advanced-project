import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { addQueryParams } from 'shared/lib/utils/queryParams/queryParams';
import {
  getArticlesListLimit,
  getArticlesListOrder,
  getArticlesListPage,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListTag,
} from '../../selectors/articlesList';

interface FetchArticlesListOptions {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListOptions, ThunkConfig>(
  'articlesList/FetchArticlesList',
  async (_, thunkApi) => {
    const { rejectWithValue, extra, getState } = thunkApi;
    const state = getState();

    const _limit = getArticlesListLimit(state);
    const _order = getArticlesListOrder(state);
    const _sort = getArticlesListSort(state);
    const _search = getArticlesListSearch(state);
    const _page = getArticlesListPage(state);
    const _tag = getArticlesListTag(state);

    addQueryParams({ order: _order, sort: _sort, search: _search, tag: _tag });

    try {
      const response = await extra.API.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page,
          _limit,
          _order,
          _sort,
          type: _tag === 'ALL' ? undefined : _tag,
          q: _search,
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
