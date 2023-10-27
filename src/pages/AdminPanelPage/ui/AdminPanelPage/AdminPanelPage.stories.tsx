import { WithStoreDecorator } from '@/shared/config/storybook';
import AdminPanel from './AdminPanelPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AdminPanel> = {
  title: 'pages/AdminPanel',
  component: AdminPanel,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof AdminPanel>;

export const Root: Story = {
  args: {

  },
};
