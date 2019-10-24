
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
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR`.should('exist').find('input').should('exist').and('have.checked');
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.should('exist').find('input').invoke('val').should('match', /STANDARD.DUTY/i);
        cy.getDataCy`HEAD.SHIM_SUPPORT`.should('exist').find('input').should('exist').and('not.have.checked');
        cy.getDataCy`SILL.SHIM_SUPPORT`.should('exist').find('input').should('exist').and('not.have.checked');
        cy.getDataCy`SILL.SILL_FLASHING`.should('exist').find('input').should('exist').and('not.have.checked');
        // INTERACTIVITY
        // head.receptor.durability
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.should('exist');
        // default configuration options are selected when toggled on
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.find('input').invoke('val').should('match', /STANDARD.DUTY/i);
        // can select different configuration option values when toggled on
        cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.find('input').type('high performance{enter}').invoke('val').should('match', /HIGH.PERFORMANCE/i);
        // // not working vvv ...
        // // can toggle configuration on or off
        // cy.getDataCy`HEAD.COMPENSATING_RECEPTOR`.find('input').click({ force: true }).should('not.have.checked');
        // // configuration options disappear when toggled off
        // cy.getDataCy`HEAD.COMPENSATING_RECEPTOR.DURABILITY`.should('not.exist');
        // sill.shim_support
        cy.getDataCy`SILL.SHIM_SUPPORT`.find('input').click({ force: true }).should('have.checked');
        // can toggle configuration on or off
        cy.getDataCy`SILL.SHIM_SUPPORT`.find('input').click({ force: true }).should('not.have.checked');
        // can select detail options
        // can select option group value --- these are unaffected by any other selections
        cy.getDataCy`GROUP.STOPS`.find('input').type('up{enter}').invoke('val').should('match', /UP/i);
        // selecting new option group value updates everything applicable, maintaining as many other selections as possible
        cy.getDataCy`CONFIGURATION.HEAD.HEAD.STOPS.UP`.should('exist');
        cy.getDataCy`DETAIL.SILL.STOPS.UP.GLAZING.INSIDE`.should('exist');
        // configuration options reset when detail option is selected (maintaining on/off toggle of each configuration type where possible)
        cy.getDataCy`SILL.SILL_FLASHING`.should('not.exist');
        // can select system options
        cy.getDataCy`SET`.find('input').type('');
        // everything downstream resets with new system option
    });
});
