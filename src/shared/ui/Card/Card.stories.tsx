import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text/Text';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'shared/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Root: Story = {
  args: {
    children: <Text title="Card title" text="Card Text" />,
  },
};
