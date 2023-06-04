import type { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitcher } from './ThemeSwitcher'

const meta: Meta<typeof ThemeSwitcher> = {
	title: 'Widgets/ThemeSwitcher',
	component: ThemeSwitcher,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ThemeSwitcher>;

export const Root: Story = {
	args: {

	},
}