describe('Sign In', () => {

  it('wrong credentials', () => {
    cy.visit('/sign-in');
    cy.url().should('include', '/sign-in');
    cy.get('[data-cy="email"]', { timeout: 10000 }).type('testuser06@gmail.com');
    cy.get('[data-cy="password"]').type('Abcd2067*');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/sign-in');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  
  it('correct credentials', () => {
    cy.visit('/sign-in');
    cy.get('[data-cy="email"]', { timeout: 10000 }).type('testuser05@gmail.com');
    cy.get('[data-cy="password"]').type('Abcd2067*');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

});
