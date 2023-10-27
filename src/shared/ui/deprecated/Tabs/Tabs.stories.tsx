import { Tabs } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tabs> = {
  title: 'shared/deprecated/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Root: Story = {
  args: {
    value: '2',
    tabs: [
      {
        content: 'SOME CONTENT 1',
        value: '1',
      },
      {
        content: 'SOME CONTENT 2',
        value: '2',
      },
      {
        content: 'SOME CONTENT 3',
        value: '3',
      },
    ],
  },
};
