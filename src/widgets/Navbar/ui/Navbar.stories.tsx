import type { Meta, StoryObj } from '@storybook/react';
import { WithReduxDecorator } from 'shared/config/storybook/WithReduxDecorator/WithReduxDecorator';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  decorators: [WithReduxDecorator({ user: {} })],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Root: Story = {
  args: {

  },
};

export const UserAuth: Story = {
  decorators: [WithReduxDecorator({
    user: {
      authData: {
        username: 'Nothingg9537',
        id: '1',
      },
    },
  }),
  ],
};
