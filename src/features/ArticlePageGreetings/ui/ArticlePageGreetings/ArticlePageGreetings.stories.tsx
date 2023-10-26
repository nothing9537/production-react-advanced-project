import type { Meta, StoryObj } from '@storybook/react';
import { ArticlePageGreetings } from './ArticlePageGreetings';

const meta: Meta<typeof ArticlePageGreetings> = {
  title: 'features/ArticlePageGreetings',
  component: ArticlePageGreetings,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticlePageGreetings>;

export const Root: Story = {
  args: {

  },
};
