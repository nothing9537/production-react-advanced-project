let profileId = '';

describe('User visits Profile Page', () => {
  beforeEach('Visit main page and authorize', () => {
    cy.visit('/');
    cy.login('testuser', '123').then((userData) => {
      profileId = userData.id;
      cy.visit(`/profile/${userData.id}`)
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  })

  it('Profile successfully loaded', () => {
    cy.getByTestId('ProfileCard.firstName').should('have.value', 'TestFirstName');
  });

  it('Editing profile', () => {
    cy.updateProfile();

    cy.getByTestId('ProfileCard.firstName').should('have.value', 'New first name');
    cy.getByTestId('ProfileCard.lastName').should('have.value', 'New last name');
  });
});
