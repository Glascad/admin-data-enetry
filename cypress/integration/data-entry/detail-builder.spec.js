
describe('testing detail builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/manufacturer/single-system/build?manufacturerId=2&systemId=2`);
    });

    // it('navigation to detail view from system tree works', () => {
    //     // select SD
    //     it('can select system detail', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    //     // select DO
    //     it('can select detail option', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    //     // select DOV
    //     it('can select detail option value', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    // });

    // it('navigation to configuration view from system tree works', () => {
    //     it('can select system configuration', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    //     it('can select configuration option', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    //     it('can select configuration option value', () => {
    //         cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.SILL.STOPS.UP`.click({ force: true });
    //         cy.getDataCy`detail-builder-link`.click();
    //         cy.url().should('match', /system\/detail/).and('not.match', /__CT__/);
    //     });
    // });

    // it('navigation within the detail builder works', () => {
    //     cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click({ force: true });
    //     cy.getDataCy`detail-builder-link`.click();
    //     // can select configuration
    //     cy.getDataCy`snail-trail-select-__CT__`.click().find('input').type('head{enter}');
    //     // default values are automatically selected
    //     cy.url().should('match', /__CT__\.HEAD\.STOPS\.UP$/);
    //     // can select different values
    //     cy.getDataCy`snail-trail-select-STOPS`.click().find('input').type('down{enter}');
    //     // can select different configuration
    //     cy.url().should('match', /__CT__\.HEAD\.STOPS\.DOWN\.GLAZING\.OUTSIDE$/);
    //     // can select different detail (empties configuration selection)
    //     cy.getDataCy`snail-trail-select-__CT__`.click().find('input').type('receptor{enter}');
    //     cy.url().should('match', /__CT__\.COMPENSATING_RECEPTOR\.DURABILITY\.STANDARD_DUTY$/);
    //     // can select different system option value (maintains detail selection)
    //     cy.getDataCy`snail-trail-select-DURABILITY`.click().find('input').type('high{enter}');
    //     cy.url().should('match', /__CT__\.COMPENSATING_RECEPTOR\.DURABILITY\.HIGH_PERFORMANCE$/);
    // });
    
    it('can translate configuration parts within configuration', () => {
        // go to configuration view
        cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD.__CT__.HEAD`.click({ force: true });
        cy.getDataCy`detail-builder-link`.click();
        // select part
        cy.getDataCy`part-9`.click({ force: true }).should('have.class', 'selected');
        // input nudge value
        cy.getDataCy`x-nudge`.type(0.5);
        cy.getDataCy`nudge-right`.click();
        cy.getDataCy`y-nudge`.type(0.5);
        cy.getDataCy`nudge-down`.click();
        // move part

        // test other actions
    });
});
