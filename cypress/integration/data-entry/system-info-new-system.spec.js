
describe('', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/system/info');
    });

    // it('Displays new system when there is no system selected', () => {
    // });

    it('Can create a new system', () => {
        cy.contains('New System');
        cy.get('[data-cy="system-name"]').type('Test System 123').should('include', 'Test System 123');
        cy.get('[data-cy="system-type"]').type('storefront{enter}').should('match', /storefront/i);
        cy.get('[data-cy="manufacturer"]').type('kawneer{enter}').should('match', /kawneer/i);
        cy.url().should('not.match', /systemId/);
        cy.get('[data-cy="save"]').click();
        cy.url().should('match', /systemId=\d+/);
    });
});
