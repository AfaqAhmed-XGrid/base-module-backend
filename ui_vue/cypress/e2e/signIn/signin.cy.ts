// Import dom data
import domData from '../../lib/signIn_lib/signIn.dom.data';

// Import configData
import configData from '../../config';

// Import constants
import constants from '../../cypress.constants';


// Cypress testing for signin with local credentials
describe('Sign In', () => {

  it('wrong credentials', () => {
    cy.visit(constants.pages.signIn.link);
    cy.url().should('include', constants.pages.signIn.link);
    cy.get(domData.localSignIn.emailInput, { timeout: 10000 }).type(configData.signIn.email);
    cy.get(domData.localSignIn.passwordInput).type(configData.signIn.wrongPassword);
    cy.get(domData.localSignIn.submitBtn).click();
    cy.url().should('include', constants.pages.signIn.link);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  
  it('correct credentials', () => {
    cy.visit(constants.pages.signIn.link);
    cy.get(domData.localSignIn.emailInput, { timeout: 10000 }).type(configData.signIn.email);
    cy.get(domData.localSignIn.passwordInput).type(configData.signIn.correctPassword);
    cy.get(domData.localSignIn.submitBtn).click();
    cy.url().should('include', constants.pages.dashboard.link);
  });

});
