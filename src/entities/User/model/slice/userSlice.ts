import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_TOKEN_KEY } from '@/shared/consts/localStorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings';
import { initAuthData } from '../services/initAuthData/initAuthData';

const initialState: UserSchema = {
  _mounted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload?.features);
      localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(action.payload.id));
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(AUTH_TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJsonSettings.fulfilled, (state, { payload }) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      })
      .addCase(initAuthData.fulfilled, (state, { payload }) => {
        state._mounted = true;
        state.authData = payload;
        setFeatureFlags(payload.features);
      })
      .addCase(initAuthData.rejected, (state) => {
        state._mounted = true;
      });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
