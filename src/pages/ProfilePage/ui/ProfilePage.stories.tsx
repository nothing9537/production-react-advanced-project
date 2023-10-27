import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import Avatar from '@/shared/ui/deprecated/Avatar/Main_avatar.png';
import { WithStoreDecorator } from '@/shared/config/storybook';
import ProfilePage from './ProfilePage';
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

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({ profile: { form: data } })],
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

export const Root: Story = {
  args: {

  },
};
