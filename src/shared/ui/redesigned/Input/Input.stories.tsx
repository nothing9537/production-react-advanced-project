import { Theme } from '@/shared/consts/theme';
import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { SearchIcon } from '@/shared/assets/redesigned-icons';
import { Input } from './Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Shared/redesigned/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Clear: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Some text',
  },
};

export const WithAddonLeft: Story = {
  args: {
    placeholder: 'Some text',
    addonLeft: <SearchIcon />,
  },
};

export const WithAddonRight: Story = {
  args: {
    placeholder: 'Some text',
    addonRight: <SearchIcon />,
  },
};
