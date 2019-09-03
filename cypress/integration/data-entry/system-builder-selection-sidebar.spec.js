
describe('Testing selection in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?systemId=1`);
    });

    it('Can select option', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOption-SET"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOption-SET"]').should('not.have.class', 'selected');
    });

    it('Can select value', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOptionValue-CENTER"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemOptionValue-CENTER"]').should('not.have.class', 'selected');
    });

    it('Can select type', () => {
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemDetailType-HEAD"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="right-sidebar-close-button"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
        cy.get('[data-cy="SystemDetailType-HEAD"]').should('not.have.class', 'selected');
    });

    it('Can select settings menu', () => {
        cy.get('[data-cy="settings-icon"]').click().should('have.class', 'selected');
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="close-system-settings"]').click();
        cy.get('.RightSidebar').should('have.class', 'closed');
    });

    // deselection
    // cy.get('[data-cy="SystemOption-set"]').click().should('have.class', 'selected');
    // cy.get('[data-cy="SystemOption-set"]').should('not.have.class', 'selected');
});
