import { action } from '@storybook/addon-actions';
import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { StarRating } from './StarRating';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StarRating> = {
  title: 'shared/redesigned/StarRating',
  component: StarRating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const RootDeprecated: Story = {
  args: {
    size: 30,
    onSelect: () => action('Star rating selected'),
  },
};

export const RootRedesigned: Story = {
  args: {
    size: 30,
    onSelect: () => action('Star rating selected'),
  },
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};
