/* eslint-disable react/display-name */

import { Decorator } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'

export const WithThemeDecorator = (theme: Theme): Decorator => (Story) => {
	return (
		<div className={`App ${theme}`}>
			<Story />
		</div>
	)
}