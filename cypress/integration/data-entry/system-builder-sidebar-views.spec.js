
describe('Testing sidbar actions in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?systemId=2`);
    });

    // add first item
    it('Can add option to empty system', () => {
        cy.get('[data-cy="add-option"]').click();
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="edit-option-name"]').type('Set{enter}');
        cy.get('[data-cy="edit-option-values"]').contains(/back/i);
        cy.get('[data-cy="edit-option-values"]').contains(/center/i);
        cy.get('[data-cy="edit-option-values"]').contains(/front/i);
        cy.get('[data-cy="edit-option-values"]').contains(/multi-plane/i);
    });
    
    // add first item
    it('Can add detail to empty system', () => {
        cy.get('[data-cy="add-detail"]').click();
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="edit-detail-name"]').type('Head{enter}');
    });


    // views
    // SystemOption
    it('Can change option name', () => {
        cy.get('[data-cy="edit-option-name"]').type('Set{enter}');
    });

    it('Can change option value"s', () => {
    });

    it('Can delete option', () => {
        cy.get('[data-cy="delete-option"]').click();
    });
    // SystemOptionValue
    // SystemDetailType
    // DetailOption
    // DetailOptionValue
    // SystemConfigurationType
    // ConfigurationOption
    // ConfigurationOptionValue

    // deselection
    // cy.get('[data-cy="SystemOption-set"]').click().should('have.class', 'selected');
    // cy.get('[data-cy="SystemOption-set"]').should('not.have.class', 'selected');
});
