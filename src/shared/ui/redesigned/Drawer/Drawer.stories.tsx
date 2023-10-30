import { Button } from '../../deprecated/Button';
import { VStack } from '../Stack';
import { Text } from '../../deprecated/Text';
import { Drawer } from './Drawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  title: 'shared/deprecated/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Root: Story = {
  args: {
    component: (
      <Button>
        Open drawer
      </Button>
    ),
    children: (
      <VStack gap={16}>
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
        <Text title="Drawer body title" text="Drawer body text" />
      </VStack>
    ),
  },
};
