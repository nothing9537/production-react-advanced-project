import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Avatar, AvatarSize } from './Avatar';
import AvatarImg from './Main_avatar.png';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Clear: Story = {
  args: {
    alt: 'Avatar',
  },
};

export const SizeSmall: Story = {
  args: {
    src: AvatarImg,
    alt: 'Avatar',
    size: AvatarSize.SMALL,
  },
};

export const SizeNormal: Story = {
  args: {
    src: AvatarImg,
    alt: 'Avatar',
    size: AvatarSize.NORMAL,
  },
};

export const SizeLarge: Story = {
  args: {
    src: AvatarImg,
    alt: 'Avatar',
    size: AvatarSize.LARGE,
  },
};

export const Rounded: Story = {
  args: {
    src: AvatarImg,
    alt: 'Avatar',
    size: AvatarSize.LARGE,
    round: true,
  },
};
