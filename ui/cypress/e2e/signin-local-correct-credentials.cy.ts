describe('local signin', () => {
    it('correct credentials', () => {
      cy.visit('/signin');
  
      cy.get('#email').type('testuser01@gmail.com');
      cy.get('#password').type('leTD30wTs4');
  
      cy.get('#signInBtn').click()
    });
  })