import { WithStoreDecorator } from '@/shared/config/storybook';
import { ArticlesSortSelector } from './ArticlesSortSelector';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticlesSortSelector> = {
  title: 'features/Article/ArticlesSortSelector',
  component: ArticlesSortSelector,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    articlesList: {

    },
  })],
};

export default meta;
type Story = StoryObj<typeof ArticlesSortSelector>;

export const Root: Story = {
  args: {

  },
};
