
describe('system-builder tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/system/info?systemId=1');
        cy.wait(3000);
    });
    it('can navigate between info and builder', () => {
        cy.get('[data-cy="load"]').click();
        cy.url().should('include', '/build');
        cy.get('[data-cy="system-info-link"]').click();
        cy.url().should('include', '/info');
        cy.get('[data-cy="load"]').click();
        cy.url().should('include', '/build');
        cy.get('[data-cy="system-info-link"]').click();
        cy.url().should('include', '/info');
    });
    it('can go back to system search from system info', () => {
        cy.get('[data-cy="close"]').click();
        cy.url().should('include', '/main-menu');
    });
    it('can go back to system search from system builder', () => {
        cy.get('[data-cy="load"]').click();
        cy.url().should('include', '/build');
        cy.get('[data-cy="close"]').click();
        cy.url().should('include', '/main-menu');
    });
});
