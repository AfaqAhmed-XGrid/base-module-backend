/// <reference types="cypress" />

// Import constants
import constants from '../cypress.constants';

// Command to signin with google programatically as recommended by https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.visit(constants.pages.signIn.link);

  // Making http request to google api with refresh token grant type to get the access token for user info
  cy.request({
    method: constants.authApis.methods.post,
    url: constants.authApis.google.token,
    body: {
      grant_type: constants.authApis.grantType.refreshToken, // to get the access token directly from google api
      client_id: Cypress.env('VITE_API_GOOGLE_CLIENT_ID'),
      client_secret: Cypress.env('VITE_API_GOOGLE_CLIENT_SECRET'),
      refresh_token: Cypress.env('VITE_API_GOOGLE_REFRESH_TOKEN'),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    // Making http request to google api with access token to get the user info
    cy.request({
      method: constants.authApis.methods.get,
      url: constants.authApis.google.user,
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };
  
      window.localStorage.setItem(constants.localStorage.userDataToken, JSON.stringify(userItem));
      cy.visit(constants.pages.dashboard.link);
      cy.url().should('include', '/dashboard');
    });
  });
});

// Command to signin with github programatically as recommended by https://docs.cypress.io/guides/end-to-end-testing/auth0-authentication
Cypress.Commands.add('loginByGithubApi', () => {
  cy.visit(constants.pages.signIn.link);

  const clientId = Cypress.env('VITE_API_GITHUB_CLIENT_ID');
  const clientSecret = Cypress.env('VITE_API_GITHUB_CLIENT_SECRET');
  const code = Cypress.env('GITHUB_ACCESS_CODE'); // This is a temporary code generated on authorizing through github

  // Making http request to github api with authorizing code to get access token
  cy.request({
    method: constants.authApis.methods.post,
    url: constants.authApis.github.token,
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    },
    headers: {
      Accept: 'application/json',
    },
  }).then(({ body }) => {
    expect(body, 'Expired access code').to.have.property('access_token');
    const accessToken = body?.access_token;
    
    // Making http request to github api with access token to get user info
    cy.request({
      method: constants.authApis.methods.get,
      url: constants.authApis.github.user,
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: accessToken,
        user: {
          githubId: body.id,
          username: body.login,
          email: body.email,
          name: body.name,
          avatarUrl: body.avatar_url,
        },
      };

      window.localStorage.setItem(constants.localStorage.userDataToken, JSON.stringify(userItem));
      cy.visit(constants.pages.dashboard.link);
      cy.url().should('include', '/dashboard');
    });
  });
});

export {};
