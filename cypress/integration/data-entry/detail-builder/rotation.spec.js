describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/detail?sampleSystem=sample3&manufacturerId=1&systemId=1&path=1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE`);
    });

    it('Can rotate details/configurations', () => {

        // changing the nudge amount works
        cy.getDataCy`rotate`.click().type('45');
        cy.getDataCy`rotate`.should('have.value', '045');

        // nudging the item moves it around.
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`rotate-counter-clockwise`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(0.7071067811865476 0.7071067811865475 -0.7071067811865475 0.7071067811865476 0 0)');
        cy.getDataCy`rotate-clockwise`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 0)');
        cy.getDataCy`rotate-clockwise`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(0.7071067811865476 -0.7071067811865475 0.7071067811865475 0.7071067811865476 0 0)');
        cy.getDataCy`rotate-counter-clockwise`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 0)');
        
    });
});