import { EditableProfileCard } from '../../src/features/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

describe('EditableProfileCard.cy.tsx', () => {
  beforeEach('Set viewport', () => {
    cy.viewport(1000, 800)
  });

  it('playground', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount((
      <TestProvider
        options={{
          initialState: {
            user: {
              authData: {
                id: '4',
              }
            }
          }
        }}
      >
        <EditableProfileCard id="4" />
      </TestProvider>
    ))
    // Describe test cases, like in EditableProfileCard.spec.tsx
  })
})