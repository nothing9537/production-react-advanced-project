import { Theme } from '@/shared/consts/theme';
import { WithFeatureFlagsDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Modal } from './Modal';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'Shared/redesigned/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK), WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, enim.',
  },
};
