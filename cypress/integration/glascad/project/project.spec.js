describe(`Data Entry can create, delete and interact with project cards`, () => {

    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/glascad/main-menu/manage-projects`);
    });

    const generatedId = Math.floor(Math.random() * 10000);

    it(`can create a new project`, () => {
        cy.getDataCy`add-button`.click();
        cy.focused().type(`${generatedId}{enter}`);
        cy.get(`[data-cy="${generatedId}"`).should('exist');
    });

    it(`can edit project`, () => {
        cy.get(`[data-cy="edit-${generatedId}"`).click({ force: true });
        cy.url().should('match', /glascad\/project\/sets\/all\?projectId=\d+/);
    });

    it(`can delete a project`, () => {
        cy.get(`[data-cy="delete-${generatedId}"`).click({ force: true });
        cy.getDataCy`modal-finish-button`.click();
        cy.get(`[data-cy="${generatedId}"`).should('not.exist');

    });
})