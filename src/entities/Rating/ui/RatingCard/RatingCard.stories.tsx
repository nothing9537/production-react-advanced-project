import { RatingCard } from './RatingCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RatingCard> = {
  title: 'entities/RatingCard',
  component: RatingCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const Root: Story = {
  args: {

  },
};
