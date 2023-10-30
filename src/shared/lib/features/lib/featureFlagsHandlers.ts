import { LAST_DESIGN_KEY } from '@/shared/consts/localStorage';
import { FeatureFlags, FeatureFlagsKeys } from '@/shared/types/featureFlags';

const defaultFeatures: FeatureFlags = { isAppRedesigned: JSON.parse(localStorage.getItem(LAST_DESIGN_KEY) as string) === 'new' };

let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};

export const getFeatureFlags = (flag: FeatureFlagsKeys): boolean | undefined => featureFlags?.[flag];

export const getAllFeatureFlags = (): FeatureFlags => featureFlags;
