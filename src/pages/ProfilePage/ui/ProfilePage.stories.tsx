import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from 'shared/config/storybook';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({ profile: {} })],
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Root: Story = {
  args: {

  },
};
