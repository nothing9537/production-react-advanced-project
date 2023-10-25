import { selectByTestId } from '../../helpers/selectByTestId';

type OptionsType = Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>;

export const getByTestId = (testId: string, options?: OptionsType) => cy.get(selectByTestId(testId), options);

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string, options?: OptionsType): Chainable<JQuery<HTMLElementTagNameMap>>;
    }
  }
}