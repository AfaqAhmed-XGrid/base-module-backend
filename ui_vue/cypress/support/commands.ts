/// <reference types="cypress" />

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.visit('/sign-in');
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: '939897276107-fg1761v94flfi7khfddn6tccjrnqo408.apps.googleusercontent.com',
      client_secret: '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',
      refresh_token: '1//04umsLnbXR-8WCgYIARAAGAQSNwF-L9Iri9YvoHZhtfRHM_Oz1nWrUSdwqlRKKHVrsOusnB2eW_rinwWhP2ISQKRBedkiS79c_YA',
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
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
  
      window.localStorage.setItem('token', JSON.stringify(userItem));
      cy.visit('/dashboard');
    });
  });
});

Cypress.Commands.add('loginByGithubApi', () => {
  cy.visit('/sign-in');

  // Replace these credentials with your GitHub app credentials
  const clientId = 'a1794cd72677e07513f5';
  const clientSecret = 'a0af01f39437393a438aa61a21dcbbfd4425a4fd';
  const code = 'd4674f99a4b3dab1c053'; // This will be obtained after GitHub OAuth login

  cy.request({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    },
    headers: {
      Accept: 'application/json',
    },
  }).then(({ body }) => {
    console.log('body: ', body);
    const accessToken = body.access_token;

    cy.request({
      method: 'GET',
      url: 'https://api.github.com/user',
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

      window.localStorage.setItem('token', JSON.stringify(userItem));
      cy.visit('/dashboard');
    });
  });
});


export {};
