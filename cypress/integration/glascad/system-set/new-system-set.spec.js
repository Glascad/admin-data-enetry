
describe('Testing creation of new system set', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/glascad/project/sets/all?projectId=2`);
        cy.wait(2000);
    });

    it('Can create new system set', () => {

        // can navigate to new system set page
        cy.getDataCy`new-system-set`.click();
        cy.url().should('match', /project.sets.system.set/i);
        cy.wait(2000);

        // can select manufacturer and system type
        // cy.getDataCy`manufacturer-name`.find('input').type('Kawneer{enter}').invoke('val').should('match', /Kawneer/i);
        // cy.getDataCy`system-type`.find('input').type('Storefront{enter}').invoke('val').should('match', /Storefront/i);

        // options should be empty before selecting a system

        // can select system
        cy.getDataCy`system-name`.find('input').type('test{enter}').invoke('val').should('match', /Test/i);

        // options should populate with default values when system is selected

        cy.getDataCy`system-name`.find('input').type('tes{enter}').invoke('val').should('match', /test/i);

        // options should populate with default values when system is selected

        // can update system set name
        cy.getDataCy`system-set-name`.type('Trifab451 - 1{enter}');

        // can select system option value

        // can select detail option value

        // cannot toggle required configuration

        // can toggle optional configuration on and off

        // can select configuration option value

        // selecting new option value resets everything downstream

        // cy.getDataCy`save`.click();
        // cy.url().should("match", /\?.*systemSetId=\d+/);
    });
});
