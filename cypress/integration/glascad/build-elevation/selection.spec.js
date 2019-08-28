describe('testing selection', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample7');
    });
    it('can hover/select/deselect a container', () => {
        // can click to select container
        cy.get('[data-cy="container-1542"]').click().should('have.class', 'selected').and('have.class', 'last-selected');
        // can use arrow key to change selection
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected').and('have.class', 'last-selected');
        // can click to add to selection
        cy.get('[data-cy="container-1515"]').click().should('have.class', 'selected').and('have.class', 'last-selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected');
        // can use shift arrow key to add to selection
        cy.get('body').type('{shift}{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1543"]').should('have.class', 'selected');
        cy.get('[data-cy="container-1515"]').should('have.class', 'selected');
        cy.get('[data-cy="container-1516"]').should('have.class', 'selected').and('have.class', 'last-selected');
        // arrow key cancels selection
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="container-1542"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1543"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1515"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1516"]').should('not.have.class', 'selected');
        cy.get('[data-cy="container-1517"]').should('have.class', 'selected').and('have.class', 'last-selected');
    });
    it('can hover/select/deselect a frame', () => {
        //checks the hover state
        // cy.get('[data-cy="3859-3939"]').trigger('mouseover').should('have.class', 'hover');
        //can click a frame
        cy.get('[data-cy="3859-3939"]').click().should('have.class', 'selected');
        //clicking adds additional frames
        cy.get('[data-cy="3862-3941"]').click().should('have.class', 'selected');
        cy.get('[data-cy="3859-3939"]').should('have.class', 'selected');
        //clicking unselects the frame
        cy.get('[data-cy="3862-3941"]').click({force: true}).should('not.have.class', 'selected');
        cy.get('[data-cy="3859-3939"]').click({force: true}).should('not.have.class', 'selected');
        //testing arrow keys on extending frames
        cy.get('[data-cy="3942"]').click().should('have.class', 'selected');
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="3944"]').should('have.class', 'selected');
        cy.get('[data-cy="3942"]').should('not.have.class', 'selected');
        //Testing shift + arrow key
        cy.get('body').type('{shift}{rightarrow}');
        cy.get('[data-cy="3942"]').should('not.have.class', 'selected');
        cy.get('[data-cy="3944"]').should('have.class', 'selected');
        cy.get('[data-cy="3946"]').should('have.class', 'selected');
        cy.get('body').type('{shift}{leftarrow}');
        cy.get('[data-cy="3942"]').should('have.class', 'selected');
        cy.get('[data-cy="3944"]').should('have.class', 'selected');
        cy.get('[data-cy="3946"]').should('have.class', 'selected');
        //testing arrow key cancels frame select
        cy.get('body').type('{rightarrow}');
        cy.get('[data-cy="3942"]').should('not.have.class', 'selected');
        cy.get('[data-cy="3944"]').should('have.class', 'selected');
        cy.get('[data-cy="3946"]').should('have.class', 'selected');
        cy.get('[data-cy="3948"]').should('have.class', 'selected');
        cy.get('body').type('{leftarrow}');
        cy.get('body').type('{leftarrow}');
        cy.get('[data-cy="3940"]').should('have.class', 'selected');
        cy.get('[data-cy="3942"]').should('have.class', 'selected');
        cy.get('[data-cy="3944"]').should('have.class', 'selected');
        cy.get('[data-cy="3946"]').should('not.have.class', 'selected');
        cy.get('[data-cy="3948"]').should('not.have.class', 'selected');
    });
});