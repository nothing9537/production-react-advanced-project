import type { Meta, StoryObj } from '@storybook/react';
import AdminPanel from './AdminPanelPage';

const meta: Meta<typeof AdminPanel> = {
  title: 'pages/AdminPanel',
  component: AdminPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminPanel>;

export const Root: Story = {
  args: {

  },
};
