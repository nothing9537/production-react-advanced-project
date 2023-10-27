import { ArticlePageGreetings } from './ArticlePageGreetings';
import type { Meta, StoryObj } from '@storybook/react';

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
