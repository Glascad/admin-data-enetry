describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/manufacturer/single-system/build?sampleSystem=sample1&manufacturerId=1&systemId=2`);
    });

    // add first item
    it('Can update a system', () => {

        // TESTING DELETE WITH CREATED UPDATED AND DELETED CHILDREN

        // Add VOID to STOP DOWN HEAD GLAZING INSIDE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD`.click({ force: true });
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`add-option`.click();
        cy.getDataCy`edit-configuration-type add_option`.type('Void{enter}');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.VOID`.should('exist');

        // Delete DURABILITY
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY`.click({ force: true });
        cy.getDataCy`edit-option-delete-button`.click();
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY`.should('not.exist');

        // Update GLAZING INSIDE COMP RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR`.click({ force: true });
        cy.getDataCy`edit-configuration-type compensating_receptor`.click();
        cy.focused().type('Jamb{enter}');
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR`.should('not.exist');
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.JAMB`.should('exist');

        // Delete STOP Down
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.click({ force: true });
        cy.getDataCy`edit-option-value-delete-button`.click();
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.should('not.exist');

        // TESTING UPDATE WITH CREATED UPDATED AND DELETED CHILDREN

        // Delete HEAD
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.HEAD`.click({ force: true });
        cy.getDataCy`edit-type-delete-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.HEAD`.should('not.exist');

        // Change default to HGIH_PERFORMANCE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE`.click({ force: true });
        cy.getDataCy`edit-option-value-default-button`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE`.should('have.class', 'default');

        // Update COMPENSATING_RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.click({ force: true });
        cy.getDataCy`edit-configuration-type compensating_receptor`.click();
        cy.focused().type('Jamb{enter}');
        cy.getDataCy`modal-finish-button`.click();
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.should('not.exist');
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.JAMB`.should('exist');

        // Add COMPENSATING_RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.click({ force: true });
        cy.getDataCy`add-configuration`.click();
        cy.getDataCy`edit-Configuration-type-add_configuration add_configuration`.type('Compensating{enter}');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.should('exist');

        // Update STOP UP -> DOWN
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.click({ force: true });
        cy.getDataCy`edit-value-name up`.click();
        cy.focused().type('Down{enter}');
        cy.getDataCy`modal-finish-button`.click();
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.should('not.exist');
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.should('exist');

        // Add STOP UP
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.click({ force: true });
        cy.getDataCy`add-option-value`.click()
        cy.getDataCy`modal-finish-button`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.should('exist');

        // Delete SCREW_SPLINE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.click({ force: true });
        cy.getDataCy`edit-option-value-delete-button`.click({ force: true });
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.should('not.exist');

    });
});
