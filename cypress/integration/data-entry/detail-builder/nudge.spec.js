describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/detail?sampleSystem=sample3&manufacturerId=1&systemId=1&path=1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE`);
    });

    it('Can nudge details/configurations', () => {

        // changing the nudge amount works
        cy.getDataCy`nudge`.click().type('1');
        cy.getDataCy`nudge`.should('have.value', '01');

        // nudging the item moves it around.
        cy.getDataCy`part-2`.click({force: true});
        cy.getDataCy`nudge-right`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 1 0)');
        cy.getDataCy`nudge-right`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 2 0)');
        cy.getDataCy`nudge-left`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 1 0)');
        cy.getDataCy`nudge-up`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 1 1)');
        cy.getDataCy`nudge-down`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 1 0)');
        cy.getDataCy`nudge-down`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(1 0 0 1 1 -1)');

    });
});