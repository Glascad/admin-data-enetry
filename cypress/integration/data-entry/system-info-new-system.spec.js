
describe('', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Can create a new system', () => {
        cy.visit('http://localhost:3000/data-entry/manufacturer/single-system/info?manufacturerId=2');
        cy.wait(2000);
        cy.contains('New System');
        cy.getDataCy`system-name`.type(`Test System ${~~(Math.random() * 100)}`);
        cy.getDataCy`system-type`.find('input').type('storefront{enter}');
        cy.getDataCy`manufacturer`.find('input').type('practice{enter}');
        cy.getDataCy`sightline`.type(3);
        cy.url().should('not.match', /systemId/);
        cy.getDataCy`save`.click();
        cy.url().should('match', /systemId=\d+/);
        cy.wait(2000);
        cy.getDataCy`system-name`.invoke('val').should('contain', 'Test System');
        cy.getDataCy`system-type`.contains('Storefront');
        cy.getDataCy`manufacturer`.contains('Practice');
        cy.getDataCy`sightline`.contains(3);
    });

    it('Can update an old system', () => {
        const num = ~~(Math.random() * 100);
        cy.visit('http://localhost:3000/data-entry/manufacturer/single-system/info?manufacturerId=2&systemId=2');
        cy.wait(2000);
        cy.getDataCy`system-name`.clear().type(`Test System - ${num}`);
        cy.getDataCy`save`.click();
        cy.getDataCy`system-name`.should('have.value', `Test System - ${num}`);
        cy.url().should('match', /build.*systemId=2/);
    });
});
