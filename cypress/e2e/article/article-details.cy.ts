let currentArticleId = '';

describe('User visits Article Details Page', () => {
  beforeEach('Login, create test article adn visit Article Details Page', () => {
    cy.login();
    cy.createArticle().then((article) => {
      cy.log(JSON.stringify(article.id));
      currentArticleId = article.id;
      cy.visit('articles/' + article.id);
    })
  });

  afterEach('Remove test article', () => {
    cy.removeArticle(currentArticleId);
  })

  it.skip('The content of the article exists', () => {
    cy.getByTestId('ArticleDetailsInfo').should('exist');
  });

  it.skip('User see the recommendations list', () => {
    cy.getByTestId('ArticleRecommendations').should('exist');
  });

  it.skip('User leaves a comment', () => {
    cy.getByTestId('ArticleDetailsInfo').should('exist');
    cy.getByTestId('ArticleDetailsComments').scrollIntoView();
    cy.addComment('New test article comment');
    cy.getByTestId('CommentCard.content').should('have.length', 1);
  });

  it('User gives a rating', () => {
    cy.getByTestId('ArticleDetailsInfo').should('exist');
    cy.getByTestId('RatingCard.Article', { timeout: 5000 }).scrollIntoView();

    cy.setRate(4, 'some feedback');
    cy.get('[data-selected=true]').should('have.length', 4);
  });
})