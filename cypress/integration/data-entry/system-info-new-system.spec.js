
describe('', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/system/info');
        cy.wait(2000);
    });

    it('Can create a new system', () => {
        cy.contains('New System');
        cy.get('[data-cy="system-name"]').type(`Test System ${~~(Math.random() * 100)}`);
        cy.get('[data-cy="system-type"]').find('input').type('storefront{enter}');
        cy.get('[data-cy="manufacturer"]').find('input').type('kawneer{enter}');
        cy.url().should('not.match', /systemId/);
        cy.get('[data-cy="save"]').click();
        cy.url().should('match', /systemId=\d+/);
        cy.wait(2000);
        cy.get('[data-cy="system-name"]').invoke('val').should('contain', 'Test System');
        cy.get('[data-cy="system-type"]').contains('Storefront');
        cy.get('[data-cy="manufacturer"]').contains('Kawneer');
    });
});
