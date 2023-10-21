import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from '@/shared/config/storybook';
import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
  title: 'features/Article/ArticleRating',
  component: ArticleRating,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  })],
};

export default meta;
type Story = StoryObj<typeof ArticleRating>;

export const Root: Story = {
  args: {
    id: '1',
  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/article-ratings?userId=1&articleId=1`,
        method: 'GET',
        status: 200,
        response: [
          {
            rate: 4,
          },
        ],
      },
    ],
  },
};

export const WithoutRate: Story = {
  args: {
    id: '1',
  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/article-ratings?userId=1&articleId=1`,
        method: 'GET',
        status: 200,
        response: [],
      },
    ],
  },
};
