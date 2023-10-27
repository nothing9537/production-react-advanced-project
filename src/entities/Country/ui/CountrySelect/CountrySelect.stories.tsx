import { Theme } from '@/shared/consts/theme';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { CountrySelect } from './CountrySelect';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CountrySelect> = {
  title: 'Entities/CountrySelect',
  component: CountrySelect,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
};

export default meta;
type Story = StoryObj<typeof CountrySelect>;

export const Root: Story = {
  args: {},
};
