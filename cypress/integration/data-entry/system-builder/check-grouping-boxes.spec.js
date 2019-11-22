describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/build?sampleSystem=sample3&manufacturerId=1&systemId=1`);
    });

    // add first item
    it('Can check grouping boxes for correct toggles and information', () => {

        // CONFIGURATION OPTION VALUE has correct information and is working correctly
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS.DOWN.GLAZING.INSIDE`.click({ force: true });

        cy.getDataCy`toggle-child-option`.should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-part`.should('exist').should('have.class', 'empty');

        // adding an option disables the part toggle
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-part`.should('have.class', 'disabled');
        // deleting option makes the part toggle clickable again
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-part`.should('not.have.class', 'disabled');

        // same with parts
        cy.getDataCy`toggle-child-part`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');

        //Needs to get Parts from the DB

        // cy.getDataCy`add-child`.click();
        // cy.getDataCy`toggle-child-option`.should('have.class','disabled');
        // cy.getDataCy`delete-child-add_part`.click();
        // cy.getDataCy`toggle-child-part`.should('not.have.class', 'disabled');

        // TODO makes sure the select has the correct information

        // DETAIL CONFIGURATION
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL`.click({ force: true });
        cy.getDataCy`delete-child-stops`.click();
        cy.getDataCy`modal-finish-button`.click();


        cy.getDataCy`toggle-child-option`.click()
            .should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-part`.should('exist').should('have.class', 'empty');

        // checks options
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-part`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-part`.should('not.have.class', 'disabled');

        // checks parts
        cy.getDataCy`toggle-child-part`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');
        // cy.getDataCy`add-child`.click();
        // cy.getDataCy`toggle-child-option`.should('have.class','disabled');
        // cy.getDataCy`delete-child-add_part`.click();
        // cy.getDataCy`toggle-child-part`.should('not.have.class', 'disabled');

        // DETAIL OPTION VALUE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP`.click({ force: true });
        cy.getDataCy`delete-child-glazing`.click();
        cy.getDataCy`modal-finish-button`.click();

        cy.getDataCy`toggle-child-option`.click().should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-configuration`.should('exist').should('have.class', 'empty');

        // checks options
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-configuration`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-configuration`.should('not.have.class', 'disabled');

        // checks configurations
        cy.getDataCy`toggle-child-configuration`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_configuration`.click();
        cy.getDataCy`toggle-child-configuration`.should('not.have.class', 'disabled');

        // SYSTEM DETAIL
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL`.click({ force: true });
        cy.getDataCy`delete-child-horizontal`.click();

        cy.getDataCy`toggle-child-option`.click().should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-configuration`.should('exist').should('have.class', 'empty');

        // checks options
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-configuration`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-configuration`.should('not.have.class', 'disabled');

        // checks configurations
        cy.getDataCy`toggle-child-configuration`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_configuration`.click();
        cy.getDataCy`toggle-child-configuration`.should('not.have.class', 'disabled');

        // SYSTEM OPTION VALUE
        cy.getDataCy`1.SET.BACK`.click({ force: true });
        cy.getDataCy`delete-child-head`.click();

        cy.getDataCy`toggle-child-option`.click().should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-detail`.should('exist').should('have.class', 'empty');

        // checks options
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-detail`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-detail`.should('not.have.class', 'disabled');

        // checks details
        cy.getDataCy`toggle-child-detail`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_detail`.click();
        cy.getDataCy`toggle-child-detail`.should('not.have.class', 'disabled');

        // SYSTEM
        cy.getDataCy`1`.click({ force: true });
        cy.getDataCy`delete-child-set`.click();
        cy.getDataCy`modal-finish-button`.click();


        cy.getDataCy`toggle-child-option`.click().should('exist').should('have.class', 'selected');
        cy.getDataCy`toggle-child-detail`.should('exist').should('have.class', 'empty');

        // checks options
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-detail`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_option`.click();
        cy.getDataCy`toggle-child-detail`.should('not.have.class', 'disabled');

        // checks details
        cy.getDataCy`toggle-child-detail`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'empty');
        cy.getDataCy`add-child`.click();
        cy.getDataCy`toggle-child-option`.should('have.class', 'disabled');
        cy.getDataCy`delete-child-add_detail`.click();
        cy.getDataCy`toggle-child-detail`.should('not.have.class', 'disabled');

    });
});