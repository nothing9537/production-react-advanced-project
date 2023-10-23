import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { ArticleViewSelector } from './ArticleViewSelector';

const meta: Meta<typeof ArticleViewSelector> = {
  title: 'features/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    articlesList: {

    },
  })],
};

export default meta;
type Story = StoryObj<typeof ArticleViewSelector>;

export const Root: Story = {
  args: {

  },
};
