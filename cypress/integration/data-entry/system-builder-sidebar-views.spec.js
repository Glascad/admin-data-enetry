
describe('Testing sidbar actions in system builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/system/build?systemId=2`);
    });

    // add first item
    it('Can add option to empty system', () => {
        cy.get('[data-cy="SystemOption-_OPTION"]').click();
        cy.get('.RightSidebar').should('have.class', 'open');
        cy.get('[data-cy="edit-option-name"]').type('Set{enter}');
        cy.get('[data-cy="edit-option-values"]').contains(/back/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/center/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/front/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/multi/i).exists();
        
        cy.get('[data-cy="SystemOptionValue-BACK"]').exists();
        cy.get('[data-cy="SystemOptionValue-FRONT"]').exists();
        cy.get('[data-cy="SystemOptionValue-MULTI_PLANE"]').exists();
        cy.get('[data-cy="SystemOptionValue-CENTER"]').click();
        cy.get('[data-cy="toggle-child-option"]').click();
        cy.get('[data-cy="edit-option-name"]').type('Joinery{enter}');
        
        cy.get('[data-cy="SystemOption-JOINERY"]').click();
        cy.get('[data-cy="edit-option-values"]').contains(/shear/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/stick/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/type/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/screw/i).exists();
        
        cy.get('[data-cy="SystemOptionValue-SCREW_SPLINE"]').click();
        cy.get('[data-cy="toggle-child-detail"]').click();
        cy.get('[data-cy="edit-detail-types"]').contains(/head/i).exists();
        cy.get('[data-cy="edit-detail-types"]').contains(/horizontal/i).exists();
        cy.get('[data-cy="edit-detail-types"]').contains(/sill/i).exists();
        cy.get('[data-cy="edit-detail-types"]').contains(/jamb/i).exists();
        cy.get('[data-cy="edit-detail-types"]').contains(/mullion/i).exists();
        
        cy.get('[data-cy="SystemDetailType-HEAD"]').click();
        // cy.get('[data-cy="toggle-child-option"]').click();
        cy.get('[data-cy="edit-option-name"]').type('Stops{enter}');
        
        // cy.get('[data-cy="SystemOption-SIGHTLINE"]').click();
        // cy.get('[data-cy="edit-option-values"]').contains(/4\.5"/i).exists();
        // cy.get('[data-cy="edit-option-values"]').contains(/2"/i).exists();
        // cy.get('[data-cy="edit-option-values"]').contains(/variable/i).exists();
        
        // cy.get('[data-cy="SystemOption-2"]').click();
        cy.get('[data-cy="DetailOption-STOPS"]').click();
        cy.get('[data-cy="edit-option-values"]').contains(/up/i).exists();
        cy.get('[data-cy="edit-option-values"]').contains(/down/i).exists();
        
        cy.get('[data-cy="DetailOptionValue-UP"]').click();
        cy.get('[data-cy="toggle-child-configuration"]').click();
        cy.get('[data-cy="edit-configuration-types"]').contains(/head/i).exists();
        cy.get('[data-cy="edit-configuration-types"]').contains(/receptor/i).exists();
        cy.get('[data-cy="edit-configuration-types"]').contains(/shim/i).exists();
        
        
        
        
        
        
        


        
    });
    
    // add first item
    // it('Can add detail to empty system', () => {
    //     cy.get('[data-cy="add-detail"]').click();
    //     cy.get('.RightSidebar').should('have.class', 'open');
    //     cy.get('[data-cy="edit-detail-name"]').type('Head{enter}');
    // });


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
