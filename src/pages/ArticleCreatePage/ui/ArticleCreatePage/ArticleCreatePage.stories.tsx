import type { Meta, StoryObj } from '@storybook/react';
import ArticleCreatePage from './ArticleCreatePage';

const meta: Meta<typeof ArticleCreatePage> = {
  title: 'pages/ArticleCreatePage',
  component: ArticleCreatePage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleCreatePage>;

export const Root: Story = {
  args: {

  },
};
