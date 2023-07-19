import type { Meta, StoryObj } from '@storybook/react';
import { WithThemeDecorator } from 'shared/config/storybook/WithThemeDecorator/WithThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Features/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK)],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {};
