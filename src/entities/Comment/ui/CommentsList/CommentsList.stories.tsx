import type { Meta, StoryObj } from '@storybook/react';
import { CommentsList } from './CommentsList';

const meta: Meta<typeof CommentsList> = {
  title: '/CommentsList',
  component: CommentsList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentsList>;

export const Root: Story = {
  args: {

  },
};
