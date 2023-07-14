import { Button, ButtonTheme } from './Button'
import { render, screen } from '@testing-library/react'

describe('button', () => {
	test('Button exists in DOM', () => {
		render(<Button>TEST</Button>)
		expect(screen.getByText('TEST')).toBeInTheDocument()
	})
	test('Button with CLEAR theme', () => {
		render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>)
		expect(screen.getByText('TEST')).toHaveClass('clear')
		screen.debug()
	})
})