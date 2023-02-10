beforeEach(() => {
    //cy.intercept('GET', 'http://omdbapi.com/*', { fixture: 'omdbResponseMultiMovie' },).as('omdbCall');
    //cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=hej*', { fixture: 'omdbResponseSingleMovie' },).as('omdbCall');
    
    cy.visit('/');
});

describe('mocked data searches', () => {
    it('should request with correct url', () => {
        addOmdbInterceptor('Single');
        cy.get('input').type('Single');

        cy.get('button').click();

        cy.wait('@omdbCall').its('request.url').should('contain', 's=Single');
    });

    it('single movie should be displayed', () => {
        addOmdbInterceptor('Single');
        cy.get('input').type('Single');

        cy.get('button').click();

        cy.get('h3').should('have.length', 1);
        cy.get('h3').should('contain.text', 'singleMovieTitle');
    });

    it('multiple movies should be displayed', () => {
        addOmdbInterceptor('Multi');
        cy.get('input').type('Multi');

        cy.get('button').click();

        cy.get('h3').should('have.length', 3);
        cy.get('h3').eq(0).should('contain.text', 'multiTitle1');
        cy.get('h3').eq(1).should('contain.text', 'multiTitle2');
        cy.get('h3').eq(2).should('contain.text', 'multiTitle3');
    });

    it('api error should display no movies', () => {
        addOmdbInterceptor('Error', 500);
        cy.get('input').type('Error');

        cy.get('button').click();

        cy.get('h3').should('have.length', 0);
    });

    it('api error should display no results found', () => {
        addOmdbInterceptor('Error', 500);
        cy.get('input').type('Error');

        cy.get('button').click();

        cy.get('p').should('have.text', 'Inga sökresultat att visa');
    });

    it('no movies found response should display no movies', () => {
        addOmdbInterceptor('NoMovie');
        cy.get('input').type('NoMovie');

        cy.get('button').click();

        cy.get('h3').should('have.length', 0);
    });

    it('no movies found response should display no results found', () => {
        addOmdbInterceptor('NoMovie');
        cy.get('input').type('NoMovie');

        cy.get('button').click();

        cy.get('p').should('have.text', 'Inga sökresultat att visa');
    });
});

function addOmdbInterceptor(queryFilter: string, retStatusCode: number = 200, fixtureName: string | null = null) {
    if(fixtureName === null) {
        fixtureName = 'omdbResponse' + queryFilter;
    }
    if (!isSuccessStatusCode(retStatusCode)) {
        fixtureName = null;
    }

    cy.intercept({
        method: 'GET',
        url: '*',
        hostname: 'omdbapi.com',
        query: {
            s: queryFilter
        }
      }, { fixture: fixtureName, statusCode: retStatusCode }).as('omdbCall');
}

function isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
}