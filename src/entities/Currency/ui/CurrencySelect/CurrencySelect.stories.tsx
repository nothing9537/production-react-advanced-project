import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { CurrencySelect } from './CurrencySelect';

const meta: Meta<typeof CurrencySelect> = {
  title: 'Entities/CurrencySelect',
  component: CurrencySelect,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
};

export default meta;
type Story = StoryObj<typeof CurrencySelect>;

export const Root: Story = {
  args: {},
};
