import React from 'react';
import { Decorator } from '@storybook/react';
import 'app/styles/index.scss';

export const WithStyleDecorator: Decorator = (Story) => (
  <div>
    <Story />
  </div>
);
