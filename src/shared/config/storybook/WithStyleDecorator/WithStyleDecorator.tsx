import { Decorator } from '@storybook/react';
// eslint-disable-next-line nothingg9537-plugin/layer-imports
import '@/app/styles/index.scss';

export const WithStyleDecorator: Decorator = (Story) => (
  <div style={{ padding: 40 }}>
    <Story />
  </div>
);
