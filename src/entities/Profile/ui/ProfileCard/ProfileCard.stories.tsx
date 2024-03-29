import Avatar from '@/shared/ui/deprecated/Avatar/Main_avatar.png';
import { WithThemeDecorator, WithFormDecorator, WithFeatureFlagsDecorator } from '@/shared/config/storybook';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Theme } from '@/shared/consts/theme';
import { Profile } from '../../model/types/profile';
import { ProfileCard } from './ProfileCard';
import type { Meta, StoryObj } from '@storybook/react';

const data: Profile = {
  firstName: 'Vadym',
  lastName: 'Monastyrskyi',
  age: 21,
  username: 'Nothingg9537',
  country: Country.USA,
  currency: Currency.USD,
  city: 'Chicago',
  state: 'IL',
  address: 'Some address',
  avatar: Avatar,
};

const meta: Meta<typeof ProfileCard> = {
  title: 'Entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK), WithFormDecorator<Profile>(data)],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Root: Story = {
  args: {

  },
};

export const RootRedesigned: Story = {
  args: {

  },
  decorators: [WithFeatureFlagsDecorator({ isAppRedesigned: true })],
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'error',
  },
};
