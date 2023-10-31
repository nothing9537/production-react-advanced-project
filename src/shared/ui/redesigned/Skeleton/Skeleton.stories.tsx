import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { Skeleton } from './Skeleton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/redesigned/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Root: Story = {
  args: {

  },
};

export const Rounded: Story = {
  args: {
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
};
