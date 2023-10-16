import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';

const meta: Meta<typeof ListBox> = {
  title: 'shared/ListBox',
  component: ListBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Root: Story = {
  args: {
    options: [
      {
        content: 'First option label',
        value: 'First option value',
      },
      {
        content: 'Second option label',
        value: 'Second option value',
      },
      {
        content: 'Third option label',
        value: 'Third option value',
      },
    ],
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      {
        content: 'First label',
        value: 'First value',
      },
      {
        content: 'Second label',
        value: 'Second value',
        disabled: true,
      },
      {
        content: 'Third label',
        value: 'Third value',
      },
    ],
  },
};
