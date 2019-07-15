describe('testing containers', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample7');
    });
    it('can hover/select/deselect a container', () => {
        // can click to select container
        cy.get('[data-cy="container-1542"]').click().should('have.class', 'selected').and('have.class', 'last-selected');
        // can use arrow key to change selection
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected').and('have.class', 'last-selected');
        // can click to add to selection
        cy.get('[data-cy="container-1515"]').click().should('have.class', 'selected').and('have.class', 'last-selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected');
        // can use shift arrow key to add to selection
        cy.get('body').type('{shift}{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected');
        cy.get('[data-cy="container-1515"]').should('have.class', 'selected');
        cy.get('[data-cy="container-1516"]').should('have.class', 'selected').and('have.class', 'last-selected');
        // arrow key cancels selection
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1543"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1515"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1516"]').should('not.have.class','selected');
        cy.get('[data-cy="container-1517"]').should('have.class','selected').and('have.class', 'last-selected');
    });
});