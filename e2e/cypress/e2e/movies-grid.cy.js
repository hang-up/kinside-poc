describe('Movies Grid', () => {
  before(() => {
    cy.visit('http://127.0.0.1:55173/')
  })

  it('should load movies', () => {
    cy.get('.movies-grid-item').should('be.visible')
    cy.get('.details').should('not.be.visible')
  });

  it('should allow searching for a movie', () => {
    // This is a STRONG assumption here: we're assuming that the data is stable and will return us a movie.
    // Ideally, this should come from a set of fixture &/or an api call, which we can then observe.
    // Until then, an assumption & a static wait will have to do.
    cy.get('#filter').type('Beetlejuice');
    cy.wait(1000);
    
    cy.get('.movies-grid-item').then($movie => {
      cy.wrap($movie).as('found');
      cy.get('@found').contains('Beetlejuice');
    })
  })
})
