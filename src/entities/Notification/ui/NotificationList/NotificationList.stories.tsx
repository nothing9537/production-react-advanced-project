import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './NotificationList';

const meta: Meta<typeof NotificationList> = {
  title: 'entities/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Root: Story = {
  args: {

  },
};
