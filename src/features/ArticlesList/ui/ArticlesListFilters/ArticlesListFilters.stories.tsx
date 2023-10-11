import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from 'shared/config/storybook';
import { ArticlesListFilters } from './ArticlesListFilters';

const meta: Meta<typeof ArticlesListFilters> = {
  title: 'features/Articles/ArticlesListFilters',
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
