describe('test switch theme', () => {
	beforeEach('visit', () => {
		cy.visit('http://localhost:3005')
	})

	it('user switching theme', () => {
		cy.get('.App').should('have.class', 'light')

		cy.get('[data-testid="theme-switcher"]').click()

		cy.get('.App').should('have.class', 'dark')
	})
})