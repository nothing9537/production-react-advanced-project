import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';

const meta: Meta<typeof ScrollToolbar> = {
  title: '/ScrollToolbar',
  component: ScrollToolbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToolbar>;

export const Root: Story = {
  args: {

  },
};
