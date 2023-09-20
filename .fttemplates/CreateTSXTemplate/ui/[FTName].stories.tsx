import type { Meta, StoryObj } from '@storybook/react';
import { [FTName] } from './[FTName]';

const meta: Meta<typeof [FTName]> = {
  title: '/[FTName]',
  component: [FTName],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof [FTName]>;

export const Root: Story = {
  args: {

  },
};
