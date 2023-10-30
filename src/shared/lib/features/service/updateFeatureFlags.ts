import { createAsyncThunk } from '@reduxjs/toolkit';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { updateFeatureFlagsMutation } from '../api';
import { getAllFeatureFlags } from '../lib/featureFlagsHandlers';

interface UpdateFeatureFlagsOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlags = createAsyncThunk<void, UpdateFeatureFlagsOptions, ThunkConfig>(
  'user/updateFeatureFlags',
  async ({ userId, newFeatures }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      await dispatch(updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags,
          ...newFeatures,
        },
      }));

      window.location.reload();

      return undefined;
    } catch (error) {
      console.log(error);

      return rejectWithValue('error-when-update-feature-flags');
    }
  },
);
