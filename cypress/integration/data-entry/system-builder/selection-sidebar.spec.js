
describe('Testing selection in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?manufacturerId=2&systemId=2`);
    });

    it('Can select settings menu', () => {
        cy.getDataCy`settings-icon`.click().should('have.class', 'checked');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`right-sidebar-close-button`.should('contain', 'Settings').click();
        cy.get('.RightSidebar').should('not.exist');
    });

    it('Can select option', () => {
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET`.click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`right-sidebar-close-button`.click();
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET`.should('not.have.class', 'selected');
    });

    it('Can select value', () => {
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET.CENTER`.click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`right-sidebar-close-button`.click();
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET.CENTER`.should('not.have.class', 'selected');
    });

    it('Can select type', () => {
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.getDataCy`right-sidebar-close-button`.click();
        cy.get('.RightSidebar').should('not.exist');
        cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HEAD`.should('not.have.class', 'selected');
    });

    // it('Should not be able to use tab to select a disabled selection field', () => {
    //     cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS`.click({ force: true });
    //     cy.getDataCy`edit-option-name`.focus({ force: true }).type('dur{enter}');
    //     cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.STOPS`.should('exist');
    //     cy.getDataCy`2.SET.CENTER.JOINERY.SCREW_SPLINE.__DT__.HORIZONTAL.__CT__.HORIZONTAL.DURABILITY`.should('not.exist');
    // });

    // deselection
    // cy.getDataCy`SystemOption-set"]').click().should('have.class', 'selected');
    // cy.getDataCy`SystemOption-set"]').should('not.have.class', 'selected');
}); 
