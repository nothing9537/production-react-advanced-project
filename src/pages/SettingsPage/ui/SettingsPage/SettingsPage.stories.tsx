import SettingsPage from './SettingsPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SettingsPage> = {
  title: 'pages/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

export const Root: Story = {
  args: {

  },
};
