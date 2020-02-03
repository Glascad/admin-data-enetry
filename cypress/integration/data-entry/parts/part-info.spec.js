
describe('Testing System Info page - update old system & create new one', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/manufacturer/parts/info?=&manufacturerId=1&partId=7');
        cy.wait(2000);
    });

    it('tests the CSS of the part', () => {
        cy.getDataCy`svg-7`.should('have.css', 'stroke-width', '0.002px');
    })
});
