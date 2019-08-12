
describe('System Set Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/sets/system-set/info?projectId=2&systemSetId=2');
    });
    // it('Can visit the page', () => {
        
    // });
    it('Can update manufacturer and system', () => {
        cy.get('[data-cy="manufacturer"]').type('kawneer');
        cy.get('[data-cy="system-id"]').type('trifab451');
    });
});
