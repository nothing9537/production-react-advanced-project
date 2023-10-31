import { WithFeatureFlagsDecorator, WithStoreDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { UiDesignSwitcher } from './UiDesignSwitcher';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UiDesignSwitcher> = {
  title: 'features/UiDesignSwitcher',
  component: UiDesignSwitcher,
  tags: ['autodocs'],
  decorators: [
    WithStoreDecorator({}),
  ],
};

export default meta;
type Story = StoryObj<typeof UiDesignSwitcher>;

export const RootDeprecated: Story = {
  args: {

  },
};

export const RootRedesigned: Story = {
  args: {

  },
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};
