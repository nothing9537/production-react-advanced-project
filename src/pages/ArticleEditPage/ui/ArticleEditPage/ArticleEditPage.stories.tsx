import { WithStoreDecorator } from '@/shared/config/storybook';
import ArticleEditPage from './ArticleEditPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleEditPage> = {
  title: 'pages/article/ArticleEditPage',
  component: ArticleEditPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof ArticleEditPage>;

export const Root: Story = {
  args: {

  },
};
