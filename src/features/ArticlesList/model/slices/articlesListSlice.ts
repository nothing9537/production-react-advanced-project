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
    hasMore: true,
    page: 1,
    _inited: false,
  }),
  reducers: {
    setView: (state, { payload }: PayloadAction<ArticlesView>) => {
      state.view = payload;
      localStorage.setItem(ARTICLES_VIEW_KEY, payload);
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setLimit: (state, { payload }: PayloadAction<number>) => {
      state.limit = payload;
    },
    setHasMore: (state, { payload }: PayloadAction<boolean>) => {
      state.hasMore = payload;
    },
    initArticlesList: (state) => {
      const view = localStorage.getItem(ARTICLES_VIEW_KEY);

      if (view) {
        state.view = localStorage.getItem(ARTICLES_VIEW_KEY) as ArticlesView;
      }

      state.limit = view === ArticlesView.LIST ? 4 : 9;
      state._inited = true;
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
        state.hasMore = payload.length > 0;
        articlesListAdapter.addMany(state, payload);
      })
      .addCase(fetchArticlesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { reducer: articlesListReducer, actions: articlesListActions } = articlesListSlice;
