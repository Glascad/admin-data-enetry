
describe('suite #1', function () {
    it('is easy', function () {
        expect(true).to.equal(true);
    });
    it('is still easy', function () {
        expect(false).to.equal(false);
    });
    // it('is hard', function () {
    //     expect(true).to.equal(false);
    // });
});

describe('visiting the application', function () {
    it('can visit the application', function () {
        cy.visit('http://localhost:3000');
        // cy.contains('System Data').click();
        // cy.contains('New System').click();
        // cy.contains('Cancel').click();
    });
})
