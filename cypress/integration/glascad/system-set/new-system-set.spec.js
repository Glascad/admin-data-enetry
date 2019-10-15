
describe('Testing creation of new system set', () => {
    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/glascad/project/sets/all?projectId=2`);
        cy.wait(2000);
    });
    
    it('Can create new system set', () => {
        cy.getDataCy`new-system-set`.click();
        cy.url().should('match', /project.sets.system-set/);
        cy.wait(2000);
        cy.getDataCy`manufacturer-name`.find('input').type('Kawneer{enter}').invoke('val').should('match', /Kawneer/i);
        cy.getDataCy`system-type`.find('input').type('Storefront{enter}').invoke('val').should('match', /Storefront/i);
        cy.getDataCy`system-name`.find('input').type('Trifab{enter}').invoke('val').should('match', /Trifab/i);
        cy.getDataCy`system-set-name`.type('Trifab451 - 1{enter}');
        cy.getDataCy`save`.click();
        cy.url().should("match", /\?.*systemSetId=\d+/);
    });
});
