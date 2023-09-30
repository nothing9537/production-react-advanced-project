import type { Meta, StoryObj } from '@storybook/react';
import { WithThemeDecorator } from 'shared/config/storybook';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator()],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Root: Story = {
  args: {

  },
};

export const Rounded: Story = {
  args: {
    borderRadius: '50%',
    width: 100,
    height: 100,
  },
};
