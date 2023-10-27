import { FeatureFlags, FeatureFlagsKeys } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};

export const getFeatureFlags = (flag: FeatureFlagsKeys) => featureFlags?.[flag];
