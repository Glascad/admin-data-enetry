
describe('edit elevation page', () => {

    beforeEach(() => {

        const elevationId = cy.login().then(cy.createSampleElevation);

        cy.visit(`/glascad/project/elevations/elevation/elevation-info?elevationId=${elevationId}`);

    });

    it('', () => {
        cy.get('input');
    });
});
