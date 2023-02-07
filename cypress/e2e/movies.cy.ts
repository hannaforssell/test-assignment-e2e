beforeEach(() => {
  cy.visit('/');
});

describe('Input', () => {
  it('types in input box', () => {
    cy.get('input').type('Hello world').should('have.value', 'Hello world');
  })
})