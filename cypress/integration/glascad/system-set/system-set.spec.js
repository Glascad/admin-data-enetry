
describe('System Set Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/sets/system-set?projectId=2&systemSetId=1');
    });

    it('Can select option values and raised option values', () => {
        // displays name of system set
        cy.getDataCy`system-set-name`.should('have.value', 'Initial System Set');
        // can change name of system set
        // displays name of system
        cy.getDataCy`system-name`.find('input').should('have.value', 'Initial System');
        // has the correct options and values in order
        cy.getDataCy`system-option-1`.find('.label').contains('Set');
        cy.getDataCy`system-option-1`.find('input').should('have.value', 'Center');
        cy.getDataCy`system-option-2`.find('.label').contains('Joinery');
        cy.getDataCy`system-option-2`.find('input').should('have.value', 'Screw Spline');
        // default option values are selected for items downstream of the initial selection
        // cy.getDataCy``
        // can change option values
        // default values are automatically selected when a new upstream selection is made
        // raised option values are displayed in correct locations
        // 
    });

    // it('Can create new system-set', () => {

    // });


    // it('Can visit the page', () => {
    // });
    // it('Can update manufacturer and system', () => {
    //     cy.getDataCy`manufacturer-id`.type('kawneer');
    //     cy.getDataCy`system-id`.type('trifab451');
    //     cy.getDataCy`system-set-name`.type('Trifab451');
    // });
    // it('Can go update options', () => {
    //     cy.visit('http://localhost:3000/glascad/project/sets/system-set/options?projectId=2&systemSetId=2');
    //     cy.getDataCy`glazing-inside`.click().should("have.class", "selected");
    //     cy.getDataCy`stops-up`.click().should("have.class", "selected");
    //     cy.getDataCy`joinery-stick`.click().should("have.class", "selected");
    // });
    // it('Can go update configuration types', () => {
    //     cy.visit('http://localhost:3000/glascad/project/sets/system-set/configuration-types?projectId=2&systemSetId=2');
    //     cy.getDataCy`head-compensating-receptor`.click().should("have.class", "selected");
    //     cy.getDataCy`sill-sill-flashing`.click().should("have.class", "selected");
    // });
});
