declare namespace Cypress {
    interface Chainable {
      // Define your custom command 'loginByGoogleApi' here
      loginByGoogleApi(): Chainable; // You can adjust the return type if needed
      loginByGithubApi(): Chainable; // You can adjust the return type if needed
    }
  }
