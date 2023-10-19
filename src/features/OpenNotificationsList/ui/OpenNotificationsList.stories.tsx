import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from '@/entities/Notification';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { OpenNotificationsList } from './OpenNotificationsList';

const notification: Notification = {
  id: '1',
  title: 'Some notification',
  description: 'Notification for user',
  userId: '1',
};

const meta: Meta<typeof OpenNotificationsList> = {
  title: 'features/OpenNotificationsList',
  component: OpenNotificationsList,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({}), (Story) => (
    <div style={{ paddingLeft: 600 }}>
      <Story />
    </div>
  )],
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: 'GET',
        status: 200,
        response: [
          { ...notification, id: '1' },
          { ...notification, id: '2' },
          { ...notification, id: '3' },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof OpenNotificationsList>;

export const Root: Story = {
  args: {

  },
};
