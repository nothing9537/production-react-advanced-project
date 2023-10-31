import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Input } from './Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Shared/deprecated/Input',
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
