describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/detail?sampleSystem=sample3&manufacturerId=1&systemId=1&path=1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE`);
    });

    it('Can reflect details/configurations', () => {

        
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`reflect-vertical`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(-1 0 0 1 0 0)');
        cy.getDataCy`reflect-horizontal`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(-1 -1.2246467991473532e-16 1.2246467991473532e-16 -1 0 0)');
        cy.getDataCy`reflect-diagonal`.click();
        cy.getDataCy`part-2`.should('have.attr', 'transform', 'matrix(9.957992501029599e-17 -1 -1 -9.957992501029599e-17 0 0)');

    });
});