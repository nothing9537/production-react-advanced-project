import { WithStoreDecorator } from '@/shared/config/storybook';
import { NotFoundPage } from './NotFoundPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Root: Story = {
  args: {

  },
};
