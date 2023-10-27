import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Text, TextSize, TextTheme } from './Text';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Text> = {
  title: 'Shared/Text',
  component: Text,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
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
    theme: TextTheme.ERROR,
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
    size: TextSize.L,
  },
};

export const SizeMedium: Story = {
  args: {
    text: 'Some medium text',
    title: 'Some medium title',
    size: TextSize.M,
  },
};
