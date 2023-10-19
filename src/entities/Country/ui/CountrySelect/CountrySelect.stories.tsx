import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { CountrySelect } from './CountrySelect';

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
