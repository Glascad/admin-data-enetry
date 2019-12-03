describe('Login logout process', function () {
    it('Logs in', function () {
        cy.visit('http://142.93.23.97:5001/')

        cy.contains('Login')

        cy.get('input[type="text"]')
            .type('ray')
        cy.get('input[type="password"]')
            .type('ray')
        cy.get('.action')
            .click()
        cy.get('.ButtonTile').trigger('mouseover')
        cy.contains('Create')
            .click()
        // cy.get('input[type="text"]:first')
        //   .type('test')
        // cy.contains('Elevation ID').parent().within(() => {
        //   cy.get('input') // this yields the input
        //     .type('test')
        // })
        cy.get("div[class='label']").contains("Elevation ID").parent().within(() => {
            cy.get("input[type='text']").type("test");
        });
    });
});
