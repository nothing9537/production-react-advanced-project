import { WithStoreDecorator } from '@/shared/config/storybook';
import ArticleCreatePage from './ArticleCreatePage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleCreatePage> = {
  title: 'pages/article/ArticleCreatePage',
  component: ArticleCreatePage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof ArticleCreatePage>;

export const Root: Story = {
  args: {

  },
};
