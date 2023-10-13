import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from 'shared/config/storybook';
import { Comment } from '../../model/types/comment';
import { CommentsList } from './CommentsList';

const comments: Comment[] = [
  {
    id: '1',
    text: 'Some comment 1',
    articleId: '1',
    user: { id: '1', username: 'admin' },
    timestamp: 1696363269054,
  },
  {
    id: '2',
    text: 'Some comment 2 ',
    articleId: '1',
    user: { id: '1', username: 'admin' },
    timestamp: 1696363269054,
  },
  {
    id: '3',
    text: 'Some comment 3',
    articleId: '1',
    user: { id: '1', username: 'admin' },
    timestamp: 1696363269054,
  },
  {
    id: '4',
    text: "Nothingg's comment",
    articleId: '1',
    user: { id: '2', username: 'Nothingg' },
    timestamp: 1696363269054,
  },
  {
    articleId: '1',
    user: { id: '2', username: 'Nothingg' },
    text: 'New comment from NOthingg',
    timestamp: 1696365122753,
    id: '5',
  },
  {
    articleId: '1',
    user: { id: '2', username: 'Nothingg' },
    text: 'More comments from Nothingg',
    timestamp: 1696365191221,
    id: '6',
  },
];

const meta: Meta<typeof CommentsList> = {
  title: 'entities/CommentsList',
  component: CommentsList,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof CommentsList>;

export const Root: Story = {
  args: {
    comments,
  },
};

export const FetchError: Story = {
  args: {
    error: 'Error',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
