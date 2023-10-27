import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@/shared/ui/deprecated/Avatar/Main_avatar.png';
import { WithThemeDecorator, WithFormDecorator } from '@/shared/config/storybook';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Theme } from '@/shared/consts/theme';
import { Profile } from '../../model/types/profile';
import { ProfileCard } from './ProfileCard';

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
    // data,
  },
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
