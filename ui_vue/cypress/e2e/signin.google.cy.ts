// Cypress testing for signin with google account
describe('Google', () => {
  it('google auth', () => {
    // custom command created in support/commands.ts
    cy.loginByGoogleApi();
  });
});
