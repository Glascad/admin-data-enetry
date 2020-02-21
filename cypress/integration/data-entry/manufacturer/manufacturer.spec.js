describe(`Data Entry can create, delete and interact with manufacturer cards`, () => {

    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/main-menu/manufacturers`);
    });

    const generatedManufacturer = Math.floor(Math.random() * 10000);

    it(`can create a new Manufacturer`, () => {
        cy.getDataCy`add-button`.click().focused().type(`${generatedManufacturer}{enter}`);
        cy.wait(1000);
        cy.get(`[data-cy="manufacturer-${generatedManufacturer}"`).should('exist');
    });

    it(`can interact with the manufacturer by clicking on it's systems`, () => {
        cy.get(`[data-cy="${generatedManufacturer}-systems-button"`).click({ force: true });
        cy.url().should('match', /systems\?=&manufacturerId=\d+/);
    });

    it(`can interact with the manufacturer by clicking on it's parts`, () => {
        cy.get(`[data-cy="${generatedManufacturer}-parts-button"`).click({ force: true });
        cy.url().should('match', /manufacturer\/parts\/all\?=&manufacturerId=\d+/);
    });

    it(`can delete a manufacturer`, () => {
        cy.get(`[data-cy="delete-${generatedManufacturer}"`).click({ force: true });
        cy.getDataCy`modal-finish-button`.click();
        cy.get(`[data-cy="manufacturer-${generatedManufacturer}"`).should('not.exist');
    });
})