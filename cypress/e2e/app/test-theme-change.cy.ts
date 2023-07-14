describe('test switch theme', () => {
	beforeEach('visit', () => {
		cy.visit('/')
	})

	it('user switching theme', () => {

		cy.get('.App').should('have.class', 'light')

		cy.get('.App').screenshot()

		cy.get('[data-testid="theme-switcher"]').click()

		cy.get('.App').should('have.class', 'dark')

		cy.get('.App').screenshot()
	})
})