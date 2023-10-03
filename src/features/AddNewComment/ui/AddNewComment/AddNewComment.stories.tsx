import type { Meta, StoryObj } from '@storybook/react';
import AddNewComment from './AddNewComment';

const meta: Meta<typeof AddNewComment> = {
  title: '/AddNewComment',
  component: AddNewComment,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddNewComment>;

export const Root: Story = {
  args: {

  },
};
