import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
  beforeEach('visit', () => {
    cy.visit('/');
    cy.viewport(1600, 900);
  })

  describe('User NON Auth', () => {
    it('User visit Main Page', () => {
      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('Non-authorized user tries to go to private route', () => {
      cy.visit('/profile/1')

      cy.get(selectByTestId('MainPage')).should('exist');
    });

    it('User open non-existent route', () => {
      cy.visit('/non-existent-route')

      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });

  describe('User authorized', () => {
    beforeEach('visit', () => {
      cy.visit('/');
      cy.viewport(1600, 900);
      cy.login('admin', '123');
    })

    it('User successfully authorized', () => {
      cy.visit('/profile/1');

      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('User goes to Articles Page', () => {
      cy.visit('/articles')

      cy.get(selectByTestId('ArticlesPage'))
    });
  });
});
