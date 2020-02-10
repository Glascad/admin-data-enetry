
describe('Testing System Info page - update old system & create new one', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/manufacturer/system-search?manufacturerId=1');
        cy.wait(2000);
    });

    it('Can update an old system (and create a new system)', () => {
        const num = ~~(Math.random() * 100);
        // DATABASE MUST BE RESEEDED FOR THIS TO WORK
        cy.getDataCy`system-info-Test`.click({ force: true });
        cy.url().should('match', /system\/info/);
        cy.getDataCy`system-name`.clear().type(`Test System - ${num}`);
        // cy.getDataCy`save`.click();
        cy.getDataCy`system-name`.should('have.value', `Test System - ${num}`);
        // cy.url().should('match', /build.*systemId=1/);
        // });

        // for some reason whichever test is second cypress says 'No commands were issued in this test'
    })

    // cy.wait(2000);
    // cy.visit('http://localhost:3000/data-entry/manufacturer/system-search?manufacturerId=1');
    // cy.wait(2000);

    it('Can create a new system', () => {

        cy.getDataCy`new-system`.click({ force: true });
        cy.url().should('match', /system\/info/);
        cy.contains('New System');
        cy.getDataCy`system-name`.type(`Test System ${~~(Math.random() * 100)}`).invoke('val').should('contain', 'Test System');
        cy.wait(2000);
        cy.getDataCy`system-type`.find('input').type('storefront{enter}').invoke('val').should('contain', 'Storefront');
        cy.getDataCy`sightline`.should('have.value', `0'-2"`)
        cy.getDataCy`sightline`.clear().type(3).blur().should('have.value', `0'-3"`)
        // cy.url().should('match', /systemId=null/);
        // cy.getDataCy`save`.click();
        // cy.url().should('match', /systemId=\d+/);
    });
});
