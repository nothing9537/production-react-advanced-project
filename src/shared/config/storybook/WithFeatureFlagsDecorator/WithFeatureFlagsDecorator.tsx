import { Decorator } from '@storybook/react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features';

export const WithFeatureFlagsDecorator = (features: FeatureFlags): Decorator => (Story) => {
  setFeatureFlags(features);

  if (features?.isAppRedesigned) {
    document.body.className = ['redesigned'].join(' ');
  }

  return (
    <Story />
  );
};
