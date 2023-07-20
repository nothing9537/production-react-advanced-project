import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';
import { User, UserShema } from '../types/user';

const initialState: UserShema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const authData = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY));

      if (authData) {
        state.authData = JSON.parse(authData);
      }
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
