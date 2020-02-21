describe('Clients can delete containers without running into problems with invalid elevations or bugs', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample10');
    });

    it('can delete containers and give them the correct VOID class-name', () => {
        // VOID_STEPPED_HEAD
        cy.getDataCy`container-11`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-11`.should('have.class', 'void-stepped-head');

        cy.getDataCy`container-12`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-12`.should('have.class', 'void-stepped-head');
        
        // VOID_LEFT_NOTCH
        cy.getDataCy`container-5`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-5`.should('have.class', 'void-left-notch');

        // VOID_RIGHT_NOTCH
        cy.getDataCy`container-16`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-16`.should('have.class', 'void-left-notch');
        

    });
    
    // Items that have had problems
    it(`can press the Delete key to delete a container`, () => {
        cy.getDataCy`container-7`.click();
        cy.get('body').type('{del}');
        cy.getDataCy`container-14`.click();
        cy.get('body').type('{del}');
        cy.getDataCy`container-12`.click();
        cy.get('body').type('{del}');
        cy.getDataCy`container-6`.click();
        cy.get('body').type('{del}');
    });

    it('can delete a corner creating a VOID_STEPPED HEAD and delete the container below it', () => {
        cy.getDataCy`container-7`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-5`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-5`.should('not.exist');
    });
    
    it('can split a merged deleted container to create a raised curb', () => {
        cy.getDataCy`container-3`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-18`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-4`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-15`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-15`.should('exist');
    });
    
    it('can delete container to create a raised curb and update adjacent container to have the right DLO', () => {
        cy.getDataCy`container-3`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-18`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-4`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-15`.click();
        cy.getDataCy`sidebar-delete-button`.click();
        cy.getDataCy`container-15`.should('exist');
    })
})