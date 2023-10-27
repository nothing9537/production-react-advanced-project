import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Shared/Popups/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const WithOptions: Story = {
  args: {
    placeholder: 'Select some option',
    defaultValue: 'Some option',
    options: [
      { label: 'Label 1', value: 'Value 1' },
      { label: 'Label 2', value: 'Value 2' },
      { label: 'Label 3', value: 'Value 3' },
    ],
  },
};
