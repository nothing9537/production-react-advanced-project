import { WithNewDesignDecorator, WithStoreDecorator } from '@/shared/config/storybook';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const RootDeprecated: Story = {
  args: {

  },
};

export const RootRedesigned: Story = {
  args: {

  },
  decorators: [WithNewDesignDecorator],
};
