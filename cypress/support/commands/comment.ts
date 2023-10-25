export const addComment = (commentBody: string) => {
  cy.getByTestId('AddNewComment.Input').type(commentBody);
  cy.getByTestId('AddNewComment.SubmitButton').click();
}

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(commentBody: string): Chainable<void>;
    }
  }
}