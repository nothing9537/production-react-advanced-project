import { action } from '@storybook/addon-actions';
import { StarRating } from './StarRating';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarRating> = {
  title: 'shared/deprecated/StarRating',
  component: StarRating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Root: Story = {
  args: {
    size: 30,
    onSelect: () => action('Star rating selected'),
  },
};
