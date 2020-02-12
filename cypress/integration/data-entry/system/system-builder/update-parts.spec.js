describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/build?sampleSystem=sample3&manufacturerId=1&systemId=1`);
    });

    // add first item
    it('makes sure the part is working correctly', () => {
        // click 451T 026
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT8__.451T_026`.click({ force: true });
        // copy to same location
        cy.getDataCy`edit-part-copy-button`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT8__.451T_026`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT-1__.451T_026`.should('exist');
        // copy again
        cy.getDataCy`edit-part-copy-button`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT8__.451T_026`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT-1__.451T_026`.should('exist');
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.SHIM_SUPPORT.__PT-2__.451T_026`.should('exist');
        // move all three to new place
        cy.getDataCy`edit-part-move-button`.click()
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.UP`.click({ force: true })
        cy.getDataCy`1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.UP.__PT8__.451T_026`.should('exist');

        // change name of original
        // delete one

    });
});