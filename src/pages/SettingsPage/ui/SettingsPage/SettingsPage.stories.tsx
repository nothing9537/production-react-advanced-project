import { WithNewDesignDecorator, WithStoreDecorator } from '@/shared/config/storybook';
import SettingsPage from './SettingsPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SettingsPage> = {
  title: 'pages/SettingsPage',
  component: SettingsPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof SettingsPage>;

export const RootDeprecated: Story = {
  args: {

  },
};

export const RootRedesigned: Story = {
  args: {

  },
  decorators: [WithNewDesignDecorator],
};
