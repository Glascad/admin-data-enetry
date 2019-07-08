describe(`Testing end to end for create elevation`, () => {
    // beforeEach(() => {
    cy.login("andrew", "andrew")
    cy.visit('http://localhost:3000/glascad/project/elevations/elevation/create-elevation?projectId=4')
    // })
    it("makes sure all the inputs work correctly", () => {
        cy.get('[data-cy=elevation-id]').type("Elevation 1")
        cy.get('[data-cy=new-elevation]').contains("Elevation 1")
        cy.get('[data-cy=rough-opening-width]').type(`10' 2"`)
        cy.get('[data-cy=rough-opening-height]').type(`5' 4"`)
        cy.get('[data-cy=starting-bay]').type(`4`)
        cy.get('[data-cy=curb-height]').type(`2'`)
    })
    // it(`tests all input types for rough-opening-width`, ()=> {
    //     cy.get('[data-cy=rough-opening-width]')
    //     .type(`10' 2"`)
    // })
});