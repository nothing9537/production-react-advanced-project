import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { WithThemeDecorator } from 'shared/config/storybook';
import { Text, TextTheme } from './Text';

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
    title: 'Story title',
  },
};
