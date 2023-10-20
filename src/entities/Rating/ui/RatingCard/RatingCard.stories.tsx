import type { Meta, StoryObj } from '@storybook/react';
import { RatingCard } from './RatingCard';

const meta: Meta<typeof RatingCard> = {
  title: '/RatingCard',
  component: RatingCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const Root: Story = {
  args: {

  },
};
