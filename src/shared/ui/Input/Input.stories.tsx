import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
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
