import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from './AppLogo';

const meta: Meta<typeof AppLogo> = {
  title: 'shared/Redesigned/AppLogo',
  component: AppLogo,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppLogo>;

export const Root: Story = {
  args: {

  },
};
