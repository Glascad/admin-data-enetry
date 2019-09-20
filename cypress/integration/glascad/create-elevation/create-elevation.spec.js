describe(`Testing end to end for create elevation`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/create-elevation?projectId=2')
        cy.wait(2000)
    })

    it("Typing in the input gives the correct value", () => {

        cy.get('[data-cy=elevation-id]').type("Elevation 1")
        cy.get('.title-bar-left').contains("Elevation 1")

        cy.get('[data-cy=rough-opening-width]')
            .clear().type(`10' 2"`).should("have.value", `10' 2"`)
            .blur().should("have.value", `10'-2"`)

        cy.get('[data-cy=rough-opening-height]')
            .clear().type(`10' 3"`).should("have.value", `10' 3"`)
            .blur().should("have.value", `10'-3"`)

        cy.get('[data-cy=starting-bay]')
            .clear().type(`4`).should("have.value", `4`)
            .blur().should("have.value", `4`)

        cy.get('[data-cy=curb-height]')
            .clear().type(`10' 4"`).should("have.value", `10' 4"`)
            .blur().should("have.value", `10'-4"`)

        cy.get('[data-cy=create')
            .click();
        
        cy.get('#InteractiveElevation');

        // cy.get('[data-cy=horizontal-distance]')
        // .clear().type(`10' 5"`).should("have.value", `10' 5"`)
        // .blur().should("have.value", `10'-5"`)        
    })

    // it(`has correct preview`, () => {
    //     cy.get('[data-cy=preview]').contains("viewBox", "0 0 38 120")
    // })

});