import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './AppLink';

const meta: Meta<typeof AppLink> = {
  title: 'Shared/Redesigned/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  args: { to: '/' },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Primary: Story = {
  args: {
    children: 'Test link',
  },
};
