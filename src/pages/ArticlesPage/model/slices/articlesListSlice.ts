import { createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Article, ArticlesSortFields, ArticlesView } from '@/entities/Article';
import { ARTICLES_VIEW_KEY } from '@/shared/consts/localStorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesListSchema } from '../types/articlesListSchema';

const articlesListAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticlesList = articlesListAdapter.getSelectors<StateSchema>((state) => (
  state?.articlesList || articlesListAdapter.getInitialState()
));

const articlesListSlice = buildSlice({
  name: 'articlesList',
  initialState: articlesListAdapter.getInitialState<ArticlesListSchema>({
    isLoading: false,
    view: ArticlesView.TILE,
    ids: [],
    entities: {},
    hasMore: true,
    limit: 9,
    page: 1,
    _inited: false,

    order: 'asc',
    sort: ArticlesSortFields.CREATED,
    search: '',
    tag: 'ALL',
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
    setOrder: (state, { payload }: PayloadAction<'asc' | 'desc'>) => {
      state.order = payload;
    },
    setSort: (state, { payload }: PayloadAction<ArticlesSortFields>) => {
      state.sort = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setTag: (state, { payload }: PayloadAction<string>) => {
      state.tag = payload;
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
      .addCase(fetchArticlesList.pending, (state, { meta }) => {
        state.isLoading = true;
        state.error = undefined;

        if (meta.arg.replace) {
          articlesListAdapter.removeAll(state);
        }
      })
      .addCase(fetchArticlesList.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;
        state.hasMore = payload.length >= state.limit;

        if (meta.arg.replace) {
          articlesListAdapter.setAll(state, payload);
        } else {
          articlesListAdapter.addMany(state, payload);
        }
      })
      .addCase(fetchArticlesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {
  reducer: articlesListReducer,
  actions: articlesListActions,
  useActions: useArticlesListActions,
} = articlesListSlice;
