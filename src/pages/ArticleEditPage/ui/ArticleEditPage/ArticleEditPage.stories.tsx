import type { Meta, StoryObj } from '@storybook/react';
import ArticleEditPage from './ArticleEditPage';

const meta: Meta<typeof ArticleEditPage> = {
  title: '/ArticleEditPage',
  component: ArticleEditPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleEditPage>;

export const Root: Story = {
  args: {

  },
};
