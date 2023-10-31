import { AppLink, AppLinkTheme } from './AppLink';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AppLink> = {
  title: 'Shared/deprecated/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: { to: '/' },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: 'Test link',
    theme: AppLinkTheme.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Test link',
    theme: AppLinkTheme.SECONDARY,
  },
};
