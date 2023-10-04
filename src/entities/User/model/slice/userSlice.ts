import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY } from 'shared/consts/localStorage';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _mounted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(action.payload));
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const authData = localStorage.getItem(AUTH_TOKEN_KEY);

      if (authData) {
        state.authData = JSON.parse(authData);
      }

      state._mounted = true;
    },
    logout: (state) => {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      state.authData = null;
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
