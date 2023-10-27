import { ThemeSwitcher } from './ThemeSwitcher';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Root: Story = {
  args: {

  },
};
