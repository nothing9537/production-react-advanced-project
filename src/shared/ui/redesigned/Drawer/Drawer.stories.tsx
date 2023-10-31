import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { Button as ButtonRedesigned } from '../../deprecated/Button';
import { VStack } from '../Stack';
import { Text as TextDeprecated } from '../../deprecated/Text';
import { Button } from '../Button';
import { Text } from '../Text';
import { Drawer } from './Drawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Drawer> = {
  title: 'shared/redesigned/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const RootDeprecated: Story = {
  args: {
    component: (
      <ButtonRedesigned>
        Open drawer
      </ButtonRedesigned>
    ),
    children: (
      <VStack gap={16}>
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
        <TextDeprecated title="Drawer body title" text="Drawer body text" />
      </VStack>
    ),
  },
};

export const RootRedesigned: Story = {
  args: {
    component: (
      <Button variant="outlined">
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
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};
