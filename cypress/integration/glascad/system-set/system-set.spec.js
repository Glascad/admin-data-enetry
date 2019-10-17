
describe('System Set Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/sets/system-set?projectId=2&systemSetId=1');
    });

    it('Can update a system set', () => {
        // INITIAL LOAD
        // should have all correct values selected based on system set data
        // system options
        cy.getDataCy`system-name`.find('input').invoke('val').should('match', /initial.system/i);
        cy.getDataCy`system-set-name`.invoke('val').should('match', /test.system.set/i);
        cy.getDataCy`SET`.find('input').invoke('val').should('match', /CENTER/i);
        cy.getDataCy`JOINERY`.find('input').invoke('val').should('match', /SCREW.SPLINE/i);
        cy.getDataCy`GROUP.GLAZING`.find('input').invoke('val').should('match', /INSIDE/i);
        cy.getDataCy`GROUP.STOPS`.find('input').invoke('val').should('match', /DOWN/i);
        // grouped options
        // details
        cy.getDataCy`HEAD`.should('exist');
        cy.getDataCy`SILL`.should('exist');
        // configurations
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR`.should('exist').find('input').should('not.have.checked');
        cy.getDataCy`HEAD.SHIM_SUPPORT`.should('exist').find('input').should('not.have.checked');
        cy.getDataCy`SILL.SHIM_SUPPORT`.should('exist').find('input').should('not.have.checked');
        cy.getDataCy`SILL.SILL_FLASHING`.should('exist').find('input').should('not.have.checked');
        // INTERACTIVITY
        // head.receptor.durability
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.should('not.exist');
        // can toggle configuration on or off
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR`.find('input').click({ force: true }).should('have.checked');
        // default configuration options are selected when toggled on
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.find('input').invoke('val').should('match', /STANDARD.DUTY/i);
        // can select different configuration option values when toggled on
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.find('input').type('high performance{enter}').invoke('val').should('match', /HIGH.PERFORMANCE/i);
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR`.find('input').click({ force: true }).should('not.have.checked');
        // configuration options disappear when toggled off
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.should('not.exist');
        // sill.shim_support
        cy.getDataCy`SILL.SHIM_SUPPORT`.find('input').click({ force: true }).invoke('val').should('have.checked');
        // can toggle configuration on or off
        cy.getDataCy`SILL.SHIM_SUPPORT`.find('input').click({ force: true }).invoke('val').should('not.have.checked');
        // can select detail options
        // can select option group value --- these are unaffected by any other selections
        cy.getDataCy`GROUP.STOPS`.find('input').type('up{enter}').invoke('val').should('match', /UP/i);
        // configuration options reset when detail option is selected (maintaining on/off toggle of each configuration type where possible)
        cy.getDataCy`SILL.SILL_FLASHING`.should('not.exist');
        // can select system options
        // everything downstream resets with new system option
        // selecting new option group value updates everything applicable, maintaining as many other selections as possible
    });

    // it('Can select option values and raised option values', () => {
    //     // displays name of system set
    //     cy.getDataCy`system-set-name`.should('have.value', 'Initial System Set');
    //     // can change name of system set
    //     // displays name of system
    //     cy.getDataCy`system-name`.find('input').should('have.value', 'Initial System');
    //     // has the correct options and values in order
    //     cy.getDataCy`system-option-1`.find('.label').contains('Set');
    //     cy.getDataCy`system-option-1`.find('input').should('have.value', 'Center');
    //     cy.getDataCy`system-option-2`.find('.label').contains('Joinery');
    //     cy.getDataCy`system-option-2`.find('input').should('have.value', 'Screw Spline');
    //     // default option values are selected for items downstream of the initial selection
    //     // cy.getDataCy``
    //     // can change option values
    //     // default values are automatically selected when a new upstream selection is made
    //     // raised option values are displayed in correct locations
    //     // 
    // });

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
