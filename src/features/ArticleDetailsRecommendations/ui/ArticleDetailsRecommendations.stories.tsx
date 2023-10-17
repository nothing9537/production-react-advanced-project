import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from 'shared/config/storybook';
import { ArticleDetailsRecommendations } from './ArticleDetailsRecommendations';

const meta: Meta<typeof ArticleDetailsRecommendations> = {
  title: 'features/ArticleDetails/ArticleDetailsRecommendations',
  component: ArticleDetailsRecommendations,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsRecommendations>;

export const Root: Story = {
  args: {

  },
};
