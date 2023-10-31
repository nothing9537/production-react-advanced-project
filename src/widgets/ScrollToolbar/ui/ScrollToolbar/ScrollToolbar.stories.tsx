import { ScrollToolbar } from './ScrollToolbar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ScrollToolbar> = {
  title: 'widgets/ScrollToolbar',
  component: ScrollToolbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToolbar>;

export const Root: Story = {
  args: {

  },
};
