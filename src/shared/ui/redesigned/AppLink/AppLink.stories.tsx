import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { AppLink } from './AppLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLink> = {
  title: 'Shared/redesigned/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: { to: '/' },
  decorators: [WithFeatureFlagsDecorator({ isAppRedesigned: true }), WithThemeDecorator(Theme.DARK, 'App_redesigned')],
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: 'Test link',
    variant: 'primary',
  },
};
