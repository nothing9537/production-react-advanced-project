import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

const articleDetailsCommentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

export const getArticleComments = articleDetailsCommentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || articleDetailsCommentsAdapter.getInitialState(),
);

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState: articleDetailsCommentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    entities: {},
    ids: [],
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByArticleId.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchCommentsByArticleId.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        articleDetailsCommentsAdapter.setAll(state, payload);
      })
      .addCase(fetchCommentsByArticleId.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer, actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice;
