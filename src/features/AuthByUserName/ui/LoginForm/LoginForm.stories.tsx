import type { Meta, StoryObj } from '@storybook/react';
import { WithStoreDecorator, WithThemeDecorator } from '@/shared/config/storybook';
import { Theme } from '@/shared/consts/theme';
import { LoginFormLazy } from './LoginForm.lazy';

const meta: Meta<typeof LoginFormLazy> = {
  title: 'Features/LoginForm',
  component: LoginFormLazy,
  tags: ['autodocs'],
  decorators: [WithThemeDecorator(Theme.DARK), WithStoreDecorator({ loginForm: { username: 'admin', password: '1234' } })],
};

export default meta;
type Story = StoryObj<typeof LoginFormLazy>;

export const Primary: Story = {};
export const WithError: Story = {
  decorators: [WithStoreDecorator({ loginForm: { username: 'admin', password: '1234', error: 'Some error!' } })],
};
export const FormSubmitting: Story = {
  decorators: [WithStoreDecorator({ loginForm: { isLoading: true } })],
};
