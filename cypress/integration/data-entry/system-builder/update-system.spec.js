describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/manufacturer/single-system/build?sampleSystem=sample1&manufacturerId=1&systemId=2`);
    });

    // add first item
    it('Can update a system', () => {

        // TESTING DELETE WITH CREATED UPDATED AND DELETED CHILDREN

        // Add DURABILITY to STOP DOWN HEAD GLAZING INSIDE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD`.click({ force: true });
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`add-option`.click();
        cy.getDataCy`edit-child-add_option add_option`.type('dur{enter}');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.HEAD.DURABILITY`.should('exist');

        // Delete DURABILITY on COMPENSATING RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY`.click({ force: true });
        cy.getDataCy`edit-option-delete-button`.click();
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR.DURABILITY`.should('not.exist');

        // Update GLAZING INSIDE COMP RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR`.click({ force: true });
        cy.getDataCy`edit-configuration-type compensating_receptor`.click();
        cy.focused().type('Jamb{enter}');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.COMPENSATING_RECEPTOR`.should('not.exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.GLAZING.INSIDE.__CT__.JAMB`.should('exist');

        // Delete STOP Down
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.click({ force: true });
        cy.getDataCy`edit-value-delete-button`.click();
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.should('not.exist');

        // TESTING UPDATE WITH CREATED UPDATED AND DELETED CHILDREN

        // Delete HEAD
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.HEAD`.click({ force: true });
        cy.getDataCy`edit-detail-delete-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.HEAD`.should('not.exist');

        // Change default to HGIH_PERFORMANCE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE`.click({ force: true });
        cy.getDataCy`default-option-value`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR.DURABILITY.HIGH_PERFORMANCE`.should('have.class', 'default');

        // Update COMPENSATING_RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.click({ force: true });
        cy.getDataCy`edit-configuration-type compensating_receptor`.click();
        cy.focused().type('Jamb{enter}');
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.should('not.exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.JAMB`.should('exist');

        // Add COMPENSATING_RECEPTOR
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.click({ force: true });
        cy.getDataCy`add-configuration`.click();
        cy.getDataCy`edit-child-add_configuration add_configuration`.type('Compensating{enter}');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP.__CT__.COMPENSATING_RECEPTOR`.should('exist');

        // Update STOP UP -> DOWN
        // cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.UP`.click({ force: true });
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

        // move HEAD
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click({ force: true });
        cy.getDataCy`edit-detail-move-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK`.click({force: true});
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('not.exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('not.exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD.STOPS`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD.STOPS.DOWN`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('exist');
        
        // copy HEAD to where it was
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD`.click({ force: true });
        cy.getDataCy`edit-detail-copy-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SHEAR_BLOCK.__DT__.HEAD`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.click({force: true});
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('exist');
        
        // move STOPS
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.click({ force: true });
        cy.getDataCy`edit-option-move-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.should('have.class', 'available');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD`.should('have.class', 'available');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD`.click({force: true});
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.should('not.exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('not.exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS.DOWN`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('exist');
        
        // copy STOPS
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS`.click({ force: true });
        cy.getDataCy`edit-option-copy-button`.click();
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('have.class', 'available');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click({force: true});
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS`.should('exist');
        cy.getDataCy`1.SET.FRONT.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN.__CT__.JAMB.DURABILITY.HIGH_PERFORMANCE`.should('exist');
        
        // delete DOWN
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.STOPS.DOWN`.click({ force: true });
        cy.getDataCy`edit-value-delete-button`.click();
        cy.getDataCy`modal-finish-button`.click();

        // move DOWN

        // copy DOWN

        // Delete SCREW_SPLINE
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.click({ force: true });
        cy.getDataCy`edit-value-delete-button`.click({ force: true });
        cy.getDataCy`modal-finish-button`.click();
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE`.should('not.exist');

        // group items,
    });
});
