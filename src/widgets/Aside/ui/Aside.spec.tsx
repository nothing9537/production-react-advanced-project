import { fireEvent, screen } from '@testing-library/react'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { Aside } from './Aside'

describe('aside', () => {
	test('text existing in DOM', () => {
		renderWithTranslation(<Aside />)
		expect(screen.getByTestId('aside')).toBeInTheDocument()
	})

	test('test toggle aside', () => {
		renderWithTranslation(<Aside />)
		const toggleButton = screen.getByTestId('aside-toggle')
		expect(screen.getByTestId('aside')).toBeInTheDocument()
		fireEvent.click(toggleButton)
		expect(screen.getByTestId('aside')).toHaveClass('collapsed')
	})
})