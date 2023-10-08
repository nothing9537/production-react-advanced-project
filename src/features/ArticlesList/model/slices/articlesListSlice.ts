import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticlesView } from 'entities/Article';
import { ARTICLES_VIEW_KEY } from 'shared/consts/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesListSchema } from '../types/articlesListSchema';

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

export const getArticlesList = articlesListAdapter.getSelectors<StateSchema>((state) => (
  state?.articlesList || articlesListAdapter.getInitialState()
));

const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState: articlesListAdapter.getInitialState<ArticlesListSchema>({
    isLoading: false,
    view: ArticlesView.TILE,
    ids: [],
    entities: {},
  }),
  reducers: {
    setView: (state, { payload }: PayloadAction<ArticlesView>) => {
      state.view = payload;
      localStorage.setItem(ARTICLES_VIEW_KEY, payload);
    },
    initArticlesList: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_KEY);

      if (view) {
        state.view = localStorage.getItem(ARTICLES_VIEW_KEY) as ArticlesView;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesList.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticlesList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        articlesListAdapter.setAll(state, payload);
      })
      .addCase(fetchArticlesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { reducer: articlesListReducer, actions: articlesListActions } = articlesListSlice;
