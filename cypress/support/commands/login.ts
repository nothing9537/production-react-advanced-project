import { AUTH_TOKEN_KEY } from '../../../src/shared/consts/localStorage';

export const login = (username: string, password: string) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password
    }
  }).then(({ body }) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(body));
  });
};
