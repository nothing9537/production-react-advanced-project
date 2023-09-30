import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';

const meta: Meta<typeof ArticleDetails> = {
  title: 'entities/ArticleDetails',
  component: ArticleDetails,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleDetails>;

export const Root: Story = {
  args: {

  },
};
