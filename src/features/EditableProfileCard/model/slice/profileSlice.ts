import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSchema } from '../../../../entities/Profile/model/types/profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
  isLoading: false,
  readonly: true,
  data: undefined,
  error: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchProfileData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.form = payload;
        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(updateProfileData.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.form = payload;
        state.isLoading = false;
        state.error = undefined;
        state.readonly = true;
      })
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { reducer: profileReducer, actions: profileActions } = profileSlice;
