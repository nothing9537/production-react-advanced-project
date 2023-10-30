import { rtkAPI } from '@/shared/API/rtkAPI';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
  userId: string;
  features: Partial<FeatureFlags>;
}

const featureFlagsAPI = rtkAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateFeatureFlags: builder.mutation<void, UpdateFeatureFlagsOptions>({
      query: ({ userId, features }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          features,
        },
      }),
    }),
  }),
});

export const updateFeatureFlagsMutation = featureFlagsAPI.endpoints.updateFeatureFlags.initiate;
