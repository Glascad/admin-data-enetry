describe(`Data Entry can create, delete and interact with system cards`, () => {

    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/manufacturer/systems?=&manufacturerId=1&systemId=1`);
    });
    
    const generatedId = Math.floor(Math.random() * 10000);
    
    it(`can create a new system`, () => {
        cy.getDataCy`new-system`.click();
        cy.getDataCy`system-name`.type(`${generatedId}`);
        cy.getDataCy`system-type `.type(`Store{enter}`);
        cy.getDataCy`sightline`.clear().type(`2{enter}`);
        cy.getDataCy`save-load`.click();
        cy.getDataCy`close`.click()
        cy.get(`[data-cy="${generatedId}"`).should('exist');
    });

    it(`can interact with the system by clicking on the load button`, () => {
        cy.get(`[data-cy="load-system-${generatedId}"`).click({ force: true });
        cy.url().should('match', /system\/build\?=&manufacturerId=\d+&systemId=\d+/);
    });

    it(`can interact with the system by clicking on the info button`, () => {
        cy.get(`[data-cy="system-info-${generatedId}"`).click({ force: true });
        cy.url().should('match', /data-entry\/system\/info\?=&manufacturerId=\d+&systemId=\d+/);
    });

    it(`can delete a system`, () => {
        cy.get(`[data-cy="delete-${generatedId}"`).click({ force: true });
        cy.getDataCy`modal-finish-button`.click();
        cy.get(`[data-cy="${generatedId}"`).should('not.exist');
    });
})