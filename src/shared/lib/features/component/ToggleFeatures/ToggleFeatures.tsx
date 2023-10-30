import { FC, ReactElement } from 'react';
import { FeatureFlagsKeys } from '../../../../types/featureFlags';
import { getFeatureFlags } from '../../lib/featureFlagsHandlers';

interface ToggleFeaturesProps {
  on: ReactElement;
  off: ReactElement;
  name: FeatureFlagsKeys;
}

export const ToggleFeatures: FC<ToggleFeaturesProps> = ({ name, on, off }) => {
  if (getFeatureFlags(name)) {
    return on;
  }

  return off;
};
