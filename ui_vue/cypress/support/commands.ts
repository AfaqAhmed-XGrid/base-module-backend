/// <reference types="cypress" />

// Import constants
import constants from '../cypress.constants';

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.visit(constants.pages.signIn.link);
  cy.request({
    method: constants.authApis.methods.post,
    url: constants.authApis.google.token,
    body: {
      grant_type: constants.authApis.grantType.refreshToken,
      client_id: import.meta.env.VITE_API_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_API_GOOGLE_CLIENT_SECRET,
      refresh_token: import.meta.env.VITE_API_GOOGLE_REFRESH_TOKEN,
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

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
    });
  });
});

Cypress.Commands.add('loginByGithubApi', () => {
  cy.visit(constants.pages.signIn.link);

  const clientId = import.meta.env.VITE_API_GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_API_GITHUB_CLIENT_SECRET;
  const code = 'd4674f99a4b3dab1c053';

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
    const accessToken = body.access_token;

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
    });
  });
});

export {};
