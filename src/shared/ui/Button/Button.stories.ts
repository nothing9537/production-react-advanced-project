import type { Meta, StoryObj } from '@storybook/react'
import { Button, ThemeButton } from './Button'
import { WithThemeDecorator } from 'shared/config/storybook/WithThemeDecorator/WithThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Button> = {
	title: 'Shared/Button',
	component: Button,
	tags: ['autodocs'],
	decorators: [WithThemeDecorator(Theme.DARK)]
}

export default meta
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: 'Text'
	},
}

export const Clear: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.CLEAR
	},
}

export const Outlined: Story = {
	args: {
		children: 'Text',
		theme: ThemeButton.OUTLINE
	}
}