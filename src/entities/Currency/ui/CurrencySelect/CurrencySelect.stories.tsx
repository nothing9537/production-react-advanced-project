import type { Meta, StoryObj } from '@storybook/react';
import { WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
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
