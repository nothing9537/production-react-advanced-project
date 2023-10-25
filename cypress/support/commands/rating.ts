export const setRate = (rate: number, feedback?: string) => {
  cy.getByTestId('RatingCard.Article');
  cy.getByTestId(`StarRating.${rate}`).click();
  cy.getByTestId('RatingCard.Input').type(feedback);
  cy.getByTestId('RatingCard.Send').click();
}

declare global {
  namespace Cypress {
    interface Chainable {
      setRate(rate: number, feedback?: string): Chainable<void>;
    }
  }
}