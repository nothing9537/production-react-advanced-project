import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { Text } from '../Text/Text';
import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'shared/redesigned/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Normal: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
  },
};

export const Light: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
    variant: 'light',
  },
};

export const Outlined: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
    variant: 'outlined',
  },
};

export const OutlinedBorderRadius32: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
    variant: 'outlined',
    borderRadius: 32,
  },
};

export const OutlinedBorderPadding24: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
    variant: 'outlined',
    padding: '24',
  },
};
