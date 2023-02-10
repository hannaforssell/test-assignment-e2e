beforeEach(() => {
  cy.visit('/');
});

describe('Finds the input & search button', () => {
  it('should find empty input', () => {
    cy.get('input').should('contain', '');
  })

  it('should find a button named \'Sök\'', () => {
    cy.get('button').should('contain', 'Sök');
  })
})

describe('Makes sure input & search button works correctly', () => {
  it('should type in input box', () => {
    cy.get('input').type('Hello world').should('have.value', 'Hello world');
  })

  it('when searching for \'Hello world\', all h3 should contain hello & world', () => {
    cy.get('input').type('Hello world');

    cy.get('button').click();

    cy.get('h3').each((el) => { 
      cy.wrap(el).contains('hello', { matchCase: false }).should('exist');
      cy.wrap(el).contains('world', { matchCase: false }).should('exist');
    });
  })
})
