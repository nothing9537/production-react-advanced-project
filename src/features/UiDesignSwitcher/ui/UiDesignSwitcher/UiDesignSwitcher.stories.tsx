import { UiDesignSwitcher } from './UiDesignSwitcher';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UiDesignSwitcher> = {
  title: 'features/UiDesignSwitcher',
  component: UiDesignSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UiDesignSwitcher>;

export const Root: Story = {
  args: {

  },
};
