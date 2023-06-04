import type { Meta, StoryObj } from '@storybook/react'
import { Aside } from './Aside'

const meta: Meta<typeof Aside> = {
	title: 'Widgets/Aside',
	component: Aside,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Aside>;

export const Root: Story = {
	args: {

	},
}