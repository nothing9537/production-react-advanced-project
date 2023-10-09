import type { Meta, StoryObj } from '@storybook/react';
import { ScrollRedistribution } from './ScrollRedistribution';

const meta: Meta<typeof ScrollRedistribution> = {
  title: '/ScrollRedistribution',
  component: ScrollRedistribution,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollRedistribution>;

export const Root: Story = {
  args: {

  },
};
