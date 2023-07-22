import type { Meta, StoryObj } from '@storybook/react';
import { WithThemeDecorator } from 'shared/config/storybook/WithThemeDecorator/WithThemeDecorator';
import { WithReduxDecorator } from 'shared/config/storybook/WithReduxDecorator/WithReduxDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Features/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK), WithReduxDecorator({ loginForm: { username: 'admin', password: '1234' } })],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary: Story = {};
export const WithError: Story = {
  decorators: [WithReduxDecorator({ loginForm: { username: 'admin', password: '1234', error: 'Some error!' } })],
};
export const FormSubmitting: Story = {
  decorators: [WithReduxDecorator({ loginForm: { isLoading: true } })],
};
