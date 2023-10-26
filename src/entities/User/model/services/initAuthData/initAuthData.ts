import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AUTH_TOKEN_KEY } from '@/shared/consts/localStorage';
import { getUserDataByIdQuery } from '../../../api';
import { User } from '../../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    let userId = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!userId) {
      return rejectWithValue('no-stashed-user');
    }

    userId = JSON.parse(userId) as string;

    try {
      const response = await dispatch(
        getUserDataByIdQuery(userId),
      ).unwrap();

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue('error-when-fetching-user');
    }
  },
);
