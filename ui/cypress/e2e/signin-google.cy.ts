describe('signin by google', () => {
    it('google-signin', () => {
        cy.visit('/signin')
        cy.get('#googleSignInBtn').click();
    })
})