import { FeatureFlagsKeys } from '@/shared/types/featureFlags';
import { getFeatureFlags } from './featureFlagsHandlers';

interface ToggleFeaturesOptions<T> {
  name: FeatureFlagsKeys;
  on: () => T;
  off: () => T;
}

export const toggleFeatures = <T>({ name, on, off }: ToggleFeaturesOptions<T>): T => {
  if (getFeatureFlags(name)) {
    return on();
  }

  return off();
};
