import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { NotificationList } from './NotificationList';

const meta: Meta<typeof NotificationList> = {
  title: 'entities/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    user: {
      authData: {
        id: '1',
      },
    },
  })],
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Root: Story = {
  args: {

  },
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications?userId=1`,
        method: 'GET',
        status: 200,
        delay: 5000,
        response: [
          {
            id: '1',
            title: 'Event 1 for user 1',
            description: 'Description of event',
          },
          {
            id: '1',
            title: 'Event 2 for user 1',
            description: 'Description of event',
          },
          {
            id: '1',
            title: 'Event 3 for user 1',
            description: 'Description of event',
          },
        ],
      },
    ],
  },
};
