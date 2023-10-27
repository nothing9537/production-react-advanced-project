import { Decorator } from '@storybook/react';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/deprecated/Loader';

export const WithSuspenseDecorator: Decorator = (Story) => {
  return (
    <Suspense fallback={<Loader />}>
      <Story />
    </Suspense>
  );
};
