import { Theme } from '@/shared/consts/theme';
import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Text } from './Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'Shared/redesigned/Text',
  component: Text,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    title: 'Story title',
    text: 'Story description',
  },
};

export const ErrorTheme: Story = {
  args: {
    title: 'Story title',
    text: 'Story description',
    variant: 'error',
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'Story title',
  },
};

export const OnlyText: Story = {
  args: {
    text: 'Story title',
  },
};

export const SizeLarge: Story = {
  args: {
    text: 'Some large text',
    title: 'Some large title',
    size: 'l',
  },
};

export const SizeMedium: Story = {
  args: {
    text: 'Some medium text',
    title: 'Some medium title',
    size: 'm',
  },
};
