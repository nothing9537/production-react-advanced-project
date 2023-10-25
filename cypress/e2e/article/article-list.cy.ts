describe('User visiting articles pages', () => {
  beforeEach('Login and visit Articles Page', () => {
    cy.login().then(() => {
      cy.visit('/articles');
    });
  });

  it('articles have successfully fetching', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  })
})