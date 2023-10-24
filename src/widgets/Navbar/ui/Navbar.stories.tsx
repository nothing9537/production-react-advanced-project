import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({ user: {} })],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Root: Story = {
  args: {

  },
};

export const UserAuth: Story = {
  decorators: [WithStoreDecorator({
    user: {
      authData: {
        username: 'Nothingg9537',
        id: '1',
      },
    },
  }),
  ],
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
