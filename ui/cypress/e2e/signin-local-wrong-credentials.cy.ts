describe('local signin', () => {
  it('wrong credentials', () => {
    cy.visit('/signin');

    cy.get('#email').type('fake@email.com');
    cy.get('#password').type('1234');

    cy.get('#signInBtn').click()
  });
})