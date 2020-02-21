describe(`Data Entry can create, delete and interact with part cards`, () => {


    beforeEach(() => {
        cy.login();
        cy.visit(`http://localhost:3000/data-entry/manufacturer/parts/all?=&manufacturerId=1`);
    });

    // const dropEvent = {
    //     dataTransfer: {
    //         dropEffect: "none",
    //         effectAllowed: "all",
    //         files: [{
    //             path: "cypress/sample-data/head-part.dxf",
    //             name: 'head-part.dxf',
    //             size: 170784,ac
    //             type: "image/vnd.dxf",
    //             lastModified: 1581115428420,
    //             webkitRelativePath: ""
    //         }],
    //         types: ["Files"]
    //     }
    // };

    // it(`can create a new part`, () => {

    //     // WONT NEED WHEN FIXED
    //     cy.getDataCy`Test Mnfg-parts-button`.click({ force: true });
    //     cy.wait(1000);
    //     cy.get('.list-container').trigger('drop', dropEvent)
    // });

    it(`can interact with the part by clicking on the info button`, () => {
        cy.getDataCy`451-VG-572-info`.click({ force: true });
        cy.url().should('match', /data-entry\/manufacturer\/parts\/info\?=&manufacturerId=\d+&partId=\d+/);
    });


    // WAITING TO IMPLEMENT WHEN CREATE WORKS
    // it(`can delete a part`, () => {
    //     cy.getDataCy`451-VG-572`.should('exist');
    //     cy.getDataCy`delete-451-VG-572`.click({ force: true });
    //     cy.getDataCy`modal-finish-button`.click();
    //     cy.getDataCy`451-VG-572`.should('not.exist');
    // });
})