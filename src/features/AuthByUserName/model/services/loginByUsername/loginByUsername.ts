import { User, userActions } from 'entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByUsernameOptions {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameOptions, ThunkConfig>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.API.post<User>('/login', authData);

      if (!response.data) {
        throw new Error('Error on server');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(response.data));
      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
