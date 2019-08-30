
describe('Testing selection in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?systemId=1`);
    });

    it('Can select option', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOption-set"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOption-set"]').should('not.have.class', 'selected');
    });
    it('Can select value', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOptionValue-center"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOptionValue-center"]').should('not.have.class', 'selected');
    });
    it('Can select type', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemDetailType-head"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemDetailType-head"]').should('not.have.class', 'selected');
    });

    // deselection
    // cy.get('[data-cy="SystemOption-set"]').click().should('have.class', 'selected');
    // cy.get('[data-cy="SystemOption-set"]').should('not.have.class', 'selected');
});
