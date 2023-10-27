import { WithStoreDecorator } from '@/shared/config/storybook';
import MainPage from './MainPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MainPage> = {
  title: 'Pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof MainPage>;

export const Root: Story = {
  args: {

  },
};
