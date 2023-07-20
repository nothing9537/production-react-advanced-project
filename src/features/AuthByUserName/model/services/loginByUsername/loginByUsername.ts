import axios from 'axios';
import { User, userActions } from 'entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import i18n from 'shared/config/i18n/i18n';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';

interface LoginByUsernameParams {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameParams>(
  'login/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post<User>('http://localhost:8000/login', authData);

      if (!response.data) {
        throw new Error('Error on server');
      }

      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(response.data));
      thunkAPI.dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(i18n.t('auth-error-message'));
    }
  },
);
