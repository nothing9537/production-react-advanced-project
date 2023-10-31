import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { AppLogo } from './AppLogo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLogo> = {
  title: 'Shared/redesigned/AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
  decorators: [WithFeatureFlagsDecorator({ isAppRedesigned: true }), WithThemeDecorator(Theme.DARK, 'App_redesigned')],
};

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Primary: Story = {
  args: {

  },
};
