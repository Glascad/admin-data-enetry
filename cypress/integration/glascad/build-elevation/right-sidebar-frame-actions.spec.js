describe(`Tests frame actions to make sure they are well integrated with the UI`, () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample3');
    });
    it(`Tests the move frame action`, () => {
        // Gets the frame to move
        cy.get('[data-cy="2039"]').click();
        // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
        cy.get('[data-cy="extend-down-left"]').should('exist');
        cy.get('[data-cy="extend-up-right"]').should('exist');
        cy.get('[data-cy="raise-curb"]').should('not.exist');
        cy.get('[data-cy="step-head"]').should('not.exist');
        // makes sure the "Move Frame" button works correctly
        cy.get('[data-cy="move-frame"]').should('exist').click();
        // types in 25" into the input
        cy.get('[data-cy="distance"]').clear().type("25");
        // Checks both buttons to make sure they exist
        cy.get('[data-cy="move-right-up"]').should('exist');
        // makes sure the action works properly
        cy.get('[data-cy="move-left-down"]').should('exist').click();
        cy.get('[data-cy="move-frame"]').click();
        cy.get('[data-cy="distance"]').clear().type(`22' 6"`);
        cy.get('[data-cy="move-left-down"]').should('not.exist');
        cy.get('[data-cy="move-right-up"]').should('exist');
        cy.get('[data-cy="distance"]').clear().type(`22' 7"`);
        cy.get('[data-cy="move-right-up"]').should('not.exist');
    });
    
    it(`Tests the extend frame action`, () => {
        // Gets the frame to extend right and left
        cy.get('[data-cy="2039"]').click();
        cy.get('[data-cy="extend-down-left"]').click();
        cy.get('body').type('{esc}');
        cy.get('[data-cy="2039"]').click();
        cy.get('[data-cy="extend-up-right"]').click();
        // Checking another elevation to check the extend up function
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample5');
        cy.get('[data-cy="2204"]').click();
        cy.get('[data-cy="extend-up-right"]').click();       
    })
    it(`tests the Step Head and Raise Curb function`, () => {
        // Gets the frame
        cy.get('[data-cy="2037"]').click();
        // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
        cy.get('[data-cy="extend-down-left"]').should('not.exist');
        cy.get('[data-cy="extend-up-right"]').should('not.exist');
        cy.get('[data-cy="raise-curb"]').should('not.exist');
        cy.get('[data-cy="move-frame"]').should('not.exist');
        // makes sure the "Step Head" button works correctly
        cy.get('[data-cy="step-head"]').should('exist').click();
        // types in 56" into the input
        cy.get('[data-cy="distance"]').clear().type("76");
        // Checks to see the validity of the input"
        cy.get('[data-cy="step-head"]').should('not.exist');
        // types in a valid option
        cy.get('[data-cy="distance"]').clear().type("75");
        // makes sure the action works properly
        cy.get('[data-cy="step-head"]').should('exist').click();
        // clears the selection
        cy.get('body').type('{esc}');
        // Gets the frame
        cy.get('[data-cy="2040"]').click();
        // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
        cy.get('[data-cy="extend-down-left"]').should('not.exist');
        cy.get('[data-cy="extend-up-right"]').should('not.exist');
        cy.get('[data-cy="step-head"]').should('not.exist');
        cy.get('[data-cy="move-frame"]').should('not.exist');
        // makes sure the "Step Head" button works correctly
        cy.get('[data-cy="raise-curb"]').should('exist').click();
        // types in 26" into the input
        cy.get('[data-cy="distance"]').clear().type("26");
        // Checks to see the validity of the input"
        cy.get('[data-cy="step-head"]').should('not.exist');
        // types in a valid option
        cy.get('[data-cy="distance"]').clear().type("25");
        // makes sure the action works properly
        cy.get('[data-cy="raise-curb"]').should('exist').click();
    })
});