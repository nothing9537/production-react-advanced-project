import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUsernameOptions {
  username: string;
  password: string;
}

interface RejectLoginByUsername {
  message: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameOptions, ThunkConfig>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.API.post<User>('/login', authData);

      if (!response.data) {
        throw new Error('server-error');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error: unknown) {
      const { response } = error as AxiosError<RejectLoginByUsername>;

      if (!response?.data) {
        return rejectWithValue('server-error');
      }

      return rejectWithValue('auth-error');
    }
  },
);
