import { AUTH_TOKEN_KEY } from '../../../src/shared/consts/localStorage';
import { User } from '../../../src/entities/User';

export const login = (username: string = 'testuser', password: string = '123') => {
  return cy.request<User>({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password
    }
  }).then(({ body }) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(body));

    return body;
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>,
    }
  }
}