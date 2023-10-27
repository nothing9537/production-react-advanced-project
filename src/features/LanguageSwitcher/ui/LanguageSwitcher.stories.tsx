import { LanguageSwitcher } from './LanguageSwitcher';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'features/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Root: Story = {
  args: {

  },
};
