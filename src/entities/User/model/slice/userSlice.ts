import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY } from '@/shared/consts/localStorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';

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
      setFeatureFlags(action.payload?.features);
    },
    initAuthData: (state) => {
      const authData = localStorage.getItem(AUTH_TOKEN_KEY);

      if (authData) {
        const parsedUser = JSON.parse(authData) as User;
        state.authData = parsedUser;
        setFeatureFlags(parsedUser?.features);
      }

      state._mounted = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
