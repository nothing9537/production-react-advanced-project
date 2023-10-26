import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../../types/jsonSettings';
import { getJsonSettings, getUserAuthData } from '../../selectors';
import { writeJsonSettingsMutation } from '../../../api';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig>(
  'user/saveJsonSettings',
  async (newJsonSettings, thunkApi) => {
    const { dispatch, getState, rejectWithValue } = thunkApi;

    const userData = getUserAuthData(getState());
    const currentUserJsonSettings = getJsonSettings(getState());

    if (!userData) {
      return rejectWithValue('no-user-data');
    }

    try {
      const response = await dispatch(writeJsonSettingsMutation({
        userId: userData.id,
        settings: {
          ...currentUserJsonSettings,
          ...newJsonSettings,
        },
      })).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue('error-when-writing-user-settings');
      }

      return response.jsonSettings;
    } catch (error) {
      return rejectWithValue('error-when-writing-user-settings');
    }
  },
);
