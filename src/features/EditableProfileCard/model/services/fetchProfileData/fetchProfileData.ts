import { UseFormSetValue } from 'react-hook-form';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

interface fetchProfileDataParams {
  id: string | undefined;
  setValue?: UseFormSetValue<Profile>;
}

export const fetchProfileData = createAsyncThunk<Profile, fetchProfileDataParams, ThunkConfig>(
  'profile/fetchProfileData',
  async ({ id, setValue }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!id) {
      return rejectWithValue('profile-fetch-error');
    }

    try {
      const response = await extra.API.get<Profile>(`/profile/${id}`);

      if (!response.data) {
        throw new Error();
      }

      if (response.data) {
        console.log('set value');
        Object.keys(response.data).forEach((key) => {
          console.log(key);
          setValue?.(key as keyof Profile, response.data[key as keyof Profile]);
        });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('profile-fetch-error');
    }
  },
);
