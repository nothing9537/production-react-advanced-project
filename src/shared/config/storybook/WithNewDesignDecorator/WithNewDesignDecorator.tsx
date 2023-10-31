import { Decorator } from '@storybook/react';
import { getAllFeatureFlags, setFeatureFlags } from '@/shared/lib/features';

export const WithNewDesignDecorator: Decorator = (Story) => {
  setFeatureFlags({ ...getAllFeatureFlags, isAppRedesigned: true });

  document.body.className = 'redesigned';

  return (
    <div className="App_redesigned">
      <Story />
    </div>
  );
};
