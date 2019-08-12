
describe('System Set Tests', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/glascad/project/sets/system-set/info?projectId=1')
    });
    it('Can visit the page', () => {
        
    });
});
