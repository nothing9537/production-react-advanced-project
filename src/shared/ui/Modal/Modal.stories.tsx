import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { WithThemeDecorator } from 'shared/config/storybook/WithThemeDecorator/WithThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

const meta: Meta<typeof Modal> = {
	title: 'Shared/Modal',
	component: Modal,
	tags: ['autodocs'],
	decorators: [WithThemeDecorator(Theme.DARK)]
}

export default meta
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
	args: {
		isOpen: true,
		children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, enim.'
	}
}