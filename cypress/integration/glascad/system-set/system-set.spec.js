
describe('System Set Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/sets/system-set/info?projectId=2&systemSetId=2');
    });
    // it('Can visit the page', () => {

    // });
    it('Can update manufacturer and system', () => {
        cy.get('[data-cy="manufacturer-id"]').type('kawneer');
        cy.get('[data-cy="system-id"]').type('trifab451');
        cy.get('[data-cy="system-set-name"]').type('Trifab451');
    });
    it('Can go update options', () => {
        cy.visit('http://localhost:3000/glascad/project/sets/system-set/options?projectId=2&systemSetId=2');
        cy.get('[data-cy="glazing-inside"]').click().should("have.class", "selected");
        cy.get('[data-cy="stops-up"]').click().should("have.class", "selected");
        cy.get('[data-cy="joinery-stick"]').click().should("have.class", "selected");
    });
    it('Can go update configuration types', () => {
        cy.visit('http://localhost:3000/glascad/project/sets/system-set/configuration-types?projectId=2&systemSetId=2');
        cy.get('[data-cy="head-compensating-receptor"]').click().should("have.class", "selected");
        cy.get('[data-cy="sill-sill-flashing"]').click().should("have.class", "selected");
    });
});
