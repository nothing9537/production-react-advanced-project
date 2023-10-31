import { Theme } from '@/shared/consts/theme';
import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Shared/redesigned/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK, 'App_redesigned'), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};

export const Clear: Story = {
  args: {
    children: 'Text',
    variant: 'clear',
  },
};

export const OutlinedSizeS: Story = {
  args: {
    children: 'Text',
    variant: 'outlined',
    size: 's',
  },
};

export const OutlinedSizeM: Story = {
  args: {
    children: 'Text',
    variant: 'outlined',
    size: 'm',
  },
};

export const OutlinedColorSuccessSizeM: Story = {
  args: {
    children: 'Text',
    variant: 'outlined',
    color: 'success',
    size: 'm',
  },
};

export const OutlinedColorCancelSizeM: Story = {
  args: {
    children: 'Text',
    variant: 'outlined',
    color: 'cancel',
    size: 'm',
  },
};

export const OutlinedSizeL: Story = {
  args: {
    children: 'Text',
    variant: 'outlined',
    size: 'l',
  },
};

export const ContainedSizeS: Story = {
  args: {
    children: 'Text',
    variant: 'contained',
    size: 's',
  },
};

export const ContainedSizeM: Story = {
  args: {
    children: 'Text',
    variant: 'contained',
    size: 'm',
  },
};

export const ContainedSizeL: Story = {
  args: {
    children: 'Text',
    variant: 'contained',
    size: 'l',
  },
};

export const DisabledOutlined: Story = {
  args: {
    children: 'Text',
    disabled: true,
    variant: 'outlined',
  },
};
