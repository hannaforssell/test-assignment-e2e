beforeEach(() => {
  cy.visit('/');
});

describe('Finding the elements on start page', () => {
  it('should find empty input', () => {
    cy.get('input').should('contain', '');
  })

  it('should find search button', () => {
    cy.get('button').should('contain', 'Sök');
  })
})

describe('Makes sure input & search button works correctly', () => {
  it('should type in input box', () => {
    cy.get('input').type('Hello world').should('have.value', 'Hello world');
  })

  it('should press search button', () => {
    cy.get('button').click();
  })

  it('should search for movies titles containing \'Hello world\'', () => {
    cy.get('input').type('Hello world');

    cy.get('button').click();
  })
})

describe('Finding elements of movie list', () => {
  it('should find all movies containing \'Hello world\'', () => {
    cy.get('input').type('Hello world');

    cy.get('button').click();

    cy.get('h3').each((el) => { 
      cy.wrap(el).contains('hello', { matchCase: false }).should('exist');
      cy.wrap(el).contains('world', { matchCase: false }).should('exist');
    });
  })
})