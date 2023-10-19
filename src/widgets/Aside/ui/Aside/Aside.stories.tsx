import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator } from '@/shared/config/storybook';
import { Aside } from './Aside';

const meta: Meta<typeof Aside> = {
  title: 'Widgets/Aside',
  component: Aside,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Aside>;

export const Root: Story = {
  decorators: [WithStoreDecorator({ user: { authData: { id: '1', username: 'Nothingg9537' } } })],
};

export const NoAuth: Story = {
  decorators: [WithStoreDecorator({ user: {} })],
};
