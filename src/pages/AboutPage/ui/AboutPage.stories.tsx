import { WithStoreDecorator } from '@/shared/config/storybook';
import AboutPage from './AboutPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AboutPage> = {
  title: 'Pages/AboutPage',
  component: AboutPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof AboutPage>;

export const Root: Story = {
  args: {

  },
};
