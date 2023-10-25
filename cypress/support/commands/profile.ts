export const updateProfile = () => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();

  cy.getByTestId('ProfileCard.firstName').clear().type('New first name');
  cy.getByTestId('ProfileCard.lastName').clear().type('New last name');

  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: 'http://localhost:8000/profile/' + profileId,
    headers: {
      Authorization: 'Auth header',
    },
    body: {
      id: "4",
      roles: ["USER"],
      firstName: "TestFirstName",
      lastName: "TestLastName",
      username: "testuser",
      age: "35",
      currency: "USD",
      country: "USA",
      city: "Chicago",
      state: "IL",
      address: "Lorem ipsum",
      avatar: "https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a"
    }
  })
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}