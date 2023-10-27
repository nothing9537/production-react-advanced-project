import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Redesigned/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};
