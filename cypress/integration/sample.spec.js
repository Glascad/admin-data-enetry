
// describe('suite #1', function () {
//     it('is easy', function () {
//         expect(true).to.equal(true);
//     });
//     it('is still easy', function () {
//         expect(false).to.equal(false);
//     });
//     // it('is hard', function () {
//     //     expect(true).to.equal(false);
//     // });
// });

describe('visiting the application', () => {

    beforeEach(() => {
        cy.cleanup();
        cy.setup();
        cy.visit('http://localhost:3000');
    });

    it('can visit the application', () => {

        cy.get('a');

        // // login
        // cy.get('input[type="text"]').type('admin');
        // cy.get('input[type="password"]').type('admin');
        // cy.get('button').contains(/Login/i).click();
        // cy.wait(5000);
        // // navigation
        // cy.get('div').contains(/Main Menu/i).click();
        // cy.get('a').contains(/Manage Projects/i).click();
        // cy.get('li.Pill .ButtonTile button').contains(/edit project/i).click();
        // cy.get('li.Pill .ButtonTile button').contains(/edit system/i).click();
        // cy.get('a').contains(/system options/i).click();
        // cy.get('a').contains(/optional parts/i).click();
        // cy.get('a').contains(/system set/i).click();
        // cy.get('button').contains(/cancel/i).click();
        // cy.get('.CircleButton').click();
        // cy.get('a').contains(/system options/i).click();
        // cy.get('a').contains(/optional parts/i).click();
        // cy.get('a').contains(/system set/i).click();
        // cy.get('button').contains(/cancel/i).click();
        // // cy.get('div').contains(/Test Project/i).click();
        // cy.get('a').contains(/Elevations/i).click();

        // cy.get('')
        // cy.contains('System Data').click();
        // cy.contains('New System').click();
        // cy.contains('Cancel').click();
    });
});


