describe('Testing  actions in system builder', () => {
    beforeEach(() => {
        cy.login();

        cy.visit(`http://localhost:3000/data-entry/system/detail?sampleSystem=sample3&manufacturerId=1&systemId=1&path=1.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD.STOPS.DOWN.GLAZING.OUTSIDE`);
    });

    it('Can align configurations together by first pressing the align buttons', () => {

        // align bottom
        cy.getDataCy`align-bottom`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 -0.781865082558085)');
        cy.get('body').type('{esc}');

        // align vcenter
        cy.getDataCy`align-vcenter`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 -0.39093254127903754)');
        cy.get('body').type('{esc}');

        // align top
        cy.getDataCy`align-top`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 1.0103029524088925e-14)');
        cy.get('body').type('{esc}');

        // align vcenter
        cy.getDataCy`align-right`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 2.9133607955304 1.0103029524088925e-14)');
        cy.get('body').type('{esc}');

        // align vcenter
        cy.getDataCy`align-hcenter`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 1.4566914390515264 1.0103029524088925e-14)');
        cy.get('body').type('{esc}');

        // align vcenter
        cy.getDataCy`align-left`.click().should('have.class', 'checked');
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0.00002208257265245983 1.0103029524088925e-14)');
        cy.get('body').type('{esc}');


    });
    it('Can align configurations together by first having the first item selected', () => {

        // align bottom
        cy.getDataCy`part-3`.click({ force: true });
        cy.getDataCy`align-bottom`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 -0.781865082558085)');

        // align vcenter
        cy.getDataCy`align-vcenter`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 -0.39093254127903754)');

        // align top
        cy.getDataCy`align-top`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0 1.0103029524088925e-14)');

        // align vcenter
        cy.getDataCy`align-right`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 2.9133607955304 1.0103029524088925e-14)');

        // align vcenter
        cy.getDataCy`align-hcenter`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 1.4566914390515264 1.0103029524088925e-14)');

        // align vcenter
        cy.getDataCy`align-left`.click().should('have.class', 'checked');
        cy.getDataCy`part-2`.click({ force: true });
        cy.getDataCy`part-3`.should('have.attr', 'transform', 'matrix(1 0 0 1 0.00002208257265245983 1.0103029524088925e-14)');

    });
});