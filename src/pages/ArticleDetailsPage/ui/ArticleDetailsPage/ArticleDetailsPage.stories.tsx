import type { Meta, StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';

const meta: Meta<typeof ArticleDetailsPage> = {
  title: 'Pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsPage>;

export const Root: Story = {
  args: {

  },
};
