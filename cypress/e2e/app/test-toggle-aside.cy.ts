describe('tesing aside', () => {
	beforeEach('visit', () => {
		cy.visit('http://localhost:3005')
	})

	it('user click to the toggle button', () => {

		cy.get('[data-testid="aside"]').should('have.class', 'src-widgets-Aside-ui-Aside-module__Aside')

		cy.get('[data-testid="aside-toggle"]').click()

		cy.get('[data-testid="aside"]').should('have.class', 'src-widgets-Aside-ui-Aside-module__collapsed')

	})
})