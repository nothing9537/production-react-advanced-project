import { WithStoreDecorator } from '@/shared/config/storybook';
import { ArticlesListFilters } from './ArticlesListFilters';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticlesListFilters> = {
  title: 'pages/Article/ArticlesListFilters',
  component: ArticlesListFilters,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    articlesList: {

    },
  })],
};

export default meta;
type Story = StoryObj<typeof ArticlesListFilters>;

export const Root: Story = {
  args: {

  },
};
