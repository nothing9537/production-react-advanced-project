import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from '@/entities/Comment';
import { UserRole } from '@/entities/User';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { ArticleDetailsComments } from './ArticleDetailsComments';

const entities: { [key: string]: Comment } = {
  1: {
    id: '1',
    text: 'Some comment 1',
    articleId: '1',
    timestamp: 1696363269054,
    user: {
      id: '1',
      username: 'admin',
      roles: ['ADMIN'] as UserRole[],
      avatar: 'https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a',
    },
  },
  2: {
    id: '2',
    text: 'Some comment 2 ',
    articleId: '1',
    timestamp: 1696363269054,
    user: {
      id: '1',
      username: 'admin',
      roles: ['ADMIN'] as UserRole[],
      avatar: 'https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a',
    },
  },
  3: {
    id: '3',
    text: 'Some comment 3',
    articleId: '1',
    timestamp: 1696363269054,
    user: {
      id: '1',
      username: 'admin',
      roles: ['ADMIN'] as UserRole[],
      avatar: 'https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a',
    },
  },
  4: {
    id: '4',
    text: 'Nothingg\'s comment',
    articleId: '1',
    timestamp: 1696363269054,
    user: {
      id: '2',
      username: 'Nothingg',
      roles: ['USER'] as UserRole[],
      avatar: 'https://cdn.discordapp.com/attachments/341701512155758594/1136485169189105714/Main_avatar.png',
    },
  },
  5: {
    articleId: '1',
    text: 'New comment from Nothingg',
    timestamp: 1696365122753,
    id: '5',
    user: {
      id: '2',
      username: 'Nothingg',
      roles: ['USER'] as UserRole[],
      avatar: 'https://cdn.discordapp.com/attachments/341701512155758594/1136485169189105714/Main_avatar.png',
    },
  },
  6: {
    articleId: '1',
    text: 'More comments from Nothingg',
    timestamp: 1696365191221,
    id: '6',
    user: {
      id: '2',
      username: 'Nothingg',
      roles: ['USER'] as UserRole[],
      avatar: 'https://cdn.discordapp.com/attachments/341701512155758594/1136485169189105714/Main_avatar.png',
    },
  },
};

const ids = ['6', '5', '1', '2', '3', '4'];

const meta: Meta<typeof ArticleDetailsComments> = {
  title: 'pages/ArticleDetails/ArticleDetailsComments',
  component: ArticleDetailsComments,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    articleDetailsComments: {
      entities,
      ids,
    },
  })],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsComments>;

export const Root: Story = {
  args: {

  },
};
