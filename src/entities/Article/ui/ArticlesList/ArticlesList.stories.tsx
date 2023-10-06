import type { Meta, StoryObj } from '@storybook/react';
import { ArticlesList } from './ArticlesList';

const meta: Meta<typeof ArticlesList> = {
  title: 'entities/ArticlesList',
  component: ArticlesList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticlesList>;

export const Root: Story = {
  args: {

  },
};
