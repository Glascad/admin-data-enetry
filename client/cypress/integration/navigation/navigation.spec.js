
describe('testing navigation', () => {
    it('login routes to project', () => {
        // login
        cy.visit('http://localhost:3000/');
        cy.get('[data-cy="username"]').type('cypress');
        cy.get('[data-cy="password"]').type(`${Cypress.env("PASSWORD")}{enter}`);
        cy.wait(5000);
        // projects
        // cy.get('div').contains('Demo Project');
        cy.get('button a').contains(/create/i).click();
        cy.focused().type('AA');
        cy.get('header button').contains(/cancel/i).click();
        cy.get('.Modal button').contains(/cancel/i).click();
        cy.get('button.action').contains(/create/i).click();
        // cy.get('button a').contains(/create/i).click();
        // cy.focused().type('AA');
    });
});
