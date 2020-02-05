describe(`Testing end to end for create elevation`, () => {

    beforeEach(() => {
        cy.login()
        cy.visit('http://localhost:3000/glascad/project/elevations/elevation/create-elevation?projectId=2')
        cy.wait(2000)
    })

    it("Typing in the input gives the correct value", () => {

        const number = Math.floor(Math.random() * 10000)

        cy.getDataCy`elevation-id`.type(`Elevation ${number}`);
        cy.get('.title-bar-left').contains(`Elevation ${number}`);

        cy.wait(2000);

        cy.getDataCy`system-set`.find('input').type("Test{enter}").invoke('val').should('match', /test/i);

        cy.getDataCy`rough-opening-width`
            .clear().type(`10' 2"`).should("have.value", `10' 2"`)
            .blur().should("have.value", `10'-2"`);

        cy.getDataCy`rough-opening-height`
            .clear().type(`10' 3"`).should("have.value", `10' 3"`)
            .blur().should("have.value", `10'-3"`);

        cy.getDataCy`starting-bay`
            .clear().type(`4`).should("have.value", `4`)
            .blur().should("have.value", `4`);
            
            cy.getDataCy`curb-height`
            .clear().type(`10' 4"`).should("have.value", `10' 4"`)
            .blur().should("have.value", `10'-4"`);
            
            cy.getDataCy`create-button`.first()
            .click();
            
            cy.get('#InteractiveElevation');
            
            cy.wait(2000);
            
            cy.get('#InteractiveElevation').contains('div');
            
            // cy.getDataCy`horizontal-distance`
            // .clear().type(`10' 5"`).should("have.value", `10' 5"`)
            // .blur().should("have.value", `10'-5"`)        
        })
        
        it(`cannot create invalid elevation`, () => {
            cy.getDataCy`starting-bay`
                .clear().type(`-1`).should("have.value", ``)
                .blur().should("have.value", ``);
        })
        
});