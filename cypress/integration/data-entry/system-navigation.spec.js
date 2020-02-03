
describe('Testing navigation in system-builder', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:3000/data-entry/system/info?manufacturerId=2&systemId=2');
        cy.wait(3000);
    });

    it('can navigate between info and builder', () => {
        cy.getDataCy`save-load`.click();
        cy.url().should('include', '/build');
        cy.getDataCy`system-info-link`.click();
        cy.url().should('include', '/info');
        cy.getDataCy`save-load`.click();
        cy.url().should('include', '/build');
        cy.getDataCy`system-info-link`.click();
        cy.url().should('include', '/info');
    });

    it('can go back to system search from system info', () => {
        cy.getDataCy`cancel`.click();
        cy.url().should('include', '/manufacturer');
    });

    it('can go back to system search from system builder', () => {
        cy.getDataCy`save-load`.click();
        cy.url().should('include', '/build');
        cy.getDataCy`close`.click();
        cy.url().should('include', '/manufacturer');
    });

    it('can navigate from manufacturer/systems to system info|builder', () => {
        cy.visit('http://localhost:3000/data-entry/manufacturer/systems?manufacturerId=2');
        cy.wait(2000);
        cy.getDataCy`new-system`.click();
        cy.url().should('include', '/system/info');
    });
});
