// Cypress testing for signin with github account
describe('Github', () => {
  it('github auth', () => {
    // custom command created in support/commands.ts
    cy.loginByGithubApi();
  });
});
