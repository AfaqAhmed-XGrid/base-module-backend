// Import dom data
import domData from '../../lib/signIn_lib/signIn.dom.data';

// Import configData
import configData from '../../config';

// Import constants
import constants from '../../cypress.constants';


// Cypress testing for signin with local credentials
describe('Sign Up', () => {

  it('passwords dont match', () => {
    cy.visit(constants.pages.signUp.link);
    cy.url().should('include', constants.pages.signUp.link);
    cy.get(domData.localSignUp.emailInput, { timeout: 10000 }).type(configData.signUp.email);
    cy.get(domData.localSignUp.userNameInput, { timeout: 10000 }).type(configData.signUp.userName);
    cy.get(domData.localSignUp.passwordInput).type(configData.signUp.password);
    cy.get(domData.localSignUp.confrimPasswordInput).type(configData.signUp.wrongConfirmPassword);
    cy.get(domData.localSignUp.submitBtn).click();
    cy.url().should('include', constants.pages.signUp.link);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);
  });
  
  it('passwords match', () => {
    cy.visit(constants.pages.signUp.link);
    cy.url().should('include', constants.pages.signUp.link);
    cy.get(domData.localSignUp.emailInput, { timeout: 10000 }).type(configData.signUp.email);
    cy.get(domData.localSignUp.userNameInput, { timeout: 10000 }).type(configData.signUp.userName);
    cy.get(domData.localSignUp.passwordInput).type(configData.signUp.password);
    cy.get(domData.localSignUp.confrimPasswordInput).type(configData.signUp.correctConfirmPassword);
    cy.get(domData.localSignUp.submitBtn).click();
    cy.url().should('include', constants.pages.dashboard.link);
  });

});
