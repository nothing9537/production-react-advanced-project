import { Decorator } from '@storybook/react'
import { BrowserRouter as Router } from 'react-router-dom'

export const WithRouterDecorator: Decorator = (Story) => {
	return (
		<Router>
			<Story />
		</Router>
	)
}