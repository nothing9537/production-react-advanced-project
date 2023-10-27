import { Text } from '../Text/Text';
import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
  title: 'shared/deprecated/Card',
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
