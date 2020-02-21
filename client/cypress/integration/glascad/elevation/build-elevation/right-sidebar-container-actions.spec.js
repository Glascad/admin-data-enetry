describe(`Tests container actions to make sure they are well integrated with the UI`, () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample3');
        cy.get('[data-cy="container-805"]').click();
    });
    it(`merges container right and left`, () => {
        // Gets the container
        cy.get('body').type('{esc}');
        cy.get('[data-cy="container-807"]').click();
        // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
        cy.get('[data-cy="merge-up"]').should('not.exist');
        cy.get('[data-cy="merge-down"]').should('exist');
        cy.get('[data-cy="merge-left"]').should('exist');
        cy.get('[data-cy="add-vertical"]').should('exist');
        cy.get('[data-cy="add-horizontal"]').should('exist');
        cy.get('[data-cy="add-bay"]').should('exist');
        cy.get('[data-cy="step-head"]').should('exist');
        cy.get('[data-cy="raise-curb"]').should('not.exist');
        cy.get('[data-cy="merge-right"]').should('exist').click();
        cy.get('[data-cy="merge-left"]').should('exist').click();
    })
    it(`merges the container down and up, also Checks step head and raise curb`, () => {
        cy.get('[data-cy="merge-up"]').should('exist').click();
        cy.get('[data-cy="step-head"]').should('exist');
        cy.get('[data-cy="merge-down"]').should('exist').click();
        cy.get('[data-cy="raise-curb"]').should('exist');

        // Raise Curb && Step Head
        cy.get('[data-cy="step-head"]').click();
        cy.get('[data-cy="distance"]').clear().type(`31' 4"`)
        cy.get('[data-cy="step-head"]').should('not.exist');
        cy.get('[data-cy="distance"]').clear().type(`15' 3"`)
        cy.get('[data-cy="step-head"]').click();
        cy.get('[data-cy="raise-curb"]').click();
        cy.get('[data-cy="distance"]').clear().type(`16' 1"`)
        cy.get('[data-cy="step-head"]').should('not.exist');
        cy.get('[data-cy="distance"]').clear().type(`16'`)
        cy.get('[data-cy="raise-curb"]').click();
    });
    it(`adds vertical && intermediate intermediate`, () => {
        cy.get('[data-cy="add-vertical"]').click()
        cy.get('body').type('{esc}');
        cy.get('[data-cy="container-805"]').click()
        cy.get('[data-cy="add-horizontal"]').click()
    });
    it(`adds a bay left and right`, () => {
        cy.get('[data-cy="add-bay"]').click()
        cy.get('[data-cy="add-bay-right"]').click()
        cy.get('body').type('{esc}');
        cy.get('[data-cy="container-805"]').click();
        cy.get('[data-cy="add-bay"]').click()
        cy.get('[data-cy="add-bay-left"]').click()
    });
});


    // it(`Tests the extend frame action`, () => {
        //     // Gets the frame to extend right and left
    //     cy.get('[data-cy="2039"]').click();
    //     cy.get('[data-cy="extend-down-left"]').click();
    //     cy.get('body').type('{esc}');
    //     cy.get('[data-cy="2039"]').click();
    //     cy.get('[data-cy="extend-up-right"]').click();
    //     // Checking another elevation to check the extend up function
    //     cy.visit('http://localhost:3000/glascad/project/elevations/elevation/build-elevation?projectId=1&sampleElevation=sample5');
    //     cy.get('[data-cy="2204"]').click();
    //     cy.get('[data-cy="extend-up-right"]').click();
    // })
    // it(`tests the Step Head and Raise Curb function`, () => {
    //     // Gets the frame
    //     cy.get('[data-cy="2037"]').click();
    //     // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
    //     cy.get('[data-cy="extend-down-left"]').should('not.exist');
    //     cy.get('[data-cy="extend-up-right"]').should('not.exist');
    //     cy.get('[data-cy="raise-curb"]').should('not.exist');
    //     cy.get('[data-cy="move-frame"]').should('not.exist');
    //     // makes sure the "Step Head" button works correctly
    //     cy.get('[data-cy="step-head"]').should('exist').click();
    //     // types in 56" into the input
    //     cy.get('[data-cy="distance"]').clear().type("76");
    //     // Checks to see the validity of the input"
    //     cy.get('[data-cy="step-head"]').should('not.exist');
    //     // types in a valid option
    //     cy.get('[data-cy="distance"]').clear().type("75");
    //     // makes sure the action works properly
    //     cy.get('[data-cy="step-head"]').should('exist').click();
    //     // clears the selection
    //     cy.get('body').type('{esc}');
    //     // Gets the frame
    //     cy.get('[data-cy="2040"]').click();
    //     // Confirms that all the buttons that should be there are present and the ones that shouldn't are gone
    //     cy.get('[data-cy="extend-down-left"]').should('not.exist');
    //     cy.get('[data-cy="extend-up-right"]').should('not.exist');
    //     cy.get('[data-cy="step-head"]').should('not.exist');
    //     cy.get('[data-cy="move-frame"]').should('not.exist');
    //     // makes sure the "Step Head" button works correctly
    //     cy.get('[data-cy="raise-curb"]').should('exist').click();
    //     // types in 26" into the input
    //     cy.get('[data-cy="distance"]').clear().type("26");
    //     // Checks to see the validity of the input"
    //     cy.get('[data-cy="step-head"]').should('not.exist');
    //     // types in a valid option
    //     cy.get('[data-cy="distance"]').clear().type("25");
    //     // makes sure the action works properly
    //     cy.get('[data-cy="raise-curb"]').should('exist').click();
    // })