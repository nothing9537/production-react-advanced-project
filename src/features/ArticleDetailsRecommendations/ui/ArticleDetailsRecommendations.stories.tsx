import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsRecommendations } from './ArticleDetailsRecommendations';

const meta: Meta<typeof ArticleDetailsRecommendations> = {
  title: 'features/ArticleDetails/ArticleDetailsRecommendations',
  component: ArticleDetailsRecommendations,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsRecommendations>;

export const Root: Story = {
  args: {

  },
};
