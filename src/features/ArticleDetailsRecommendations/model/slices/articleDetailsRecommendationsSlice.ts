import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { fetchArticleDetailsRecommendations } from '../services/fetchArticleDetailsRecommendations/fetchArticleDetailsRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsRecommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
    isLoading: false,
    ids: [],
    entities: {},
    error: undefined,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleDetailsRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticleDetailsRecommendations.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, payload);
      })
      .addCase(fetchArticleDetailsRecommendations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const {
  reducer: articleDetailsRecommendationsReducer,
  actions: articleDetailsRecommendationsActions,
} = articleDetailsRecommendationsSlice;
