describe('Login logout process', function () {
    it('Logs in', function () {
        cy.visit('http://localhost:3000');

        cy.getDataCy`username`.type(Cypress.env("USERNAME"));
        cy.getDataCy`password`.type(`${Cypress.env("PASSWORD")}{enter}`);

        cy.url().should('not.match', /login/i);
    });
});
