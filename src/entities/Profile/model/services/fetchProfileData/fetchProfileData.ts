import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig>(
  'profile/fetchProfileData',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.API.get<Profile>('/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue('profile-fetch-error');
    }
  },
);
