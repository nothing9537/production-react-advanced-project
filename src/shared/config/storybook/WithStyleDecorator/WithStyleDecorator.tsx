import { Decorator } from '@storybook/react';
import 'app/styles/index.scss';

export const WithStyleDecorator: Decorator = (Story) => (
  <div style={{ padding: 40 }}>
    <Story />
  </div>
);
