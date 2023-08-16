// Import dom data
import domData from '../../lib/signIn_lib/signIn.dom.data';

// Import configData
import configData from '../../config';

// Import constants
import constants from '../../cypress.constants';

// Cypress testing for movie table
describe('Movie Data Page', () => {
  it('sign in user', () => {
    cy.visit(constants.pages.signIn.link);
    cy.get(domData.localSignIn.emailInput, { timeout: 10000 }).type(configData.signIn.email);
    cy.get(domData.localSignIn.passwordInput).type(configData.signIn.correctPassword);
    cy.get(domData.localSignIn.submitBtn).click();
    cy.url().should('include', constants.pages.dashboard.link);

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
    cy.visit(constants.pages.movies.link);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    // Table is rendered
    cy.get('.overflowX-sm-scroll').should('be.visible');
    cy.get('table').should('be.visible');

    // Table is populated
    cy.get('table tbody tr').should('have.length.gt', 0);
  });
    
});
