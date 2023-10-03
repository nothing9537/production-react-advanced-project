import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig>(
  'articleDetails/addCommentForArticle',
  async (commentText, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const userData = getUserAuthData(getState());
    const articleData = getArticleDetailsData(getState());
    const timestamp = Date.now();

    if (!userData || !commentText || !articleData) {
      return rejectWithValue('error-when-send-comment');
    }

    try {
      const response = await extra.API.post<Comment>('/comments', {
        articleId: articleData.id,
        userId: userData.id,
        text: commentText,
        timestamp,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(articleData.id));

      return response.data;
    } catch (error) {
      return rejectWithValue('error-when-send-comment');
    }
  },
);
