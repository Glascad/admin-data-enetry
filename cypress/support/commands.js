// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("JSON-Web-Token")}`,
});

Cypress.Commands.add("login", () => (
    cy.request({
        method: "POST",
        url: "http://localhost:5001/graphql",
        body: {
            query: `
                mutation {
                    authenticate(
                        input: {
                            username: "cypress"
                            password: "cypress"
                        }
                    ) {
                        jwt
                    }
                }
            `,
        },
    }).then(({
        body: {
            data: {
                authenticate: {
                    jwt,
                },
            },
        },
    }) => window.localStorage.setItem("JSON-Web-Token", jwt))
));

Cypress.Commands.add("createSampleElevation", () => (
    cy.request({
        method: "POST",
        url: "http://localhost:5001/graphql",
        headers: getHeaders(),
        body: {
            query: `
                mutation {
                    updateEntireElevation (
                        input: {
                            elevation: {
                                sightline: 2
                                roughOpening: {
                                    x: 240
                                    y: 120
                                }
                                containers: [
                                    {
                                        fakeId: 1
                                        original: true
                                        daylightOpening: {
                                            x: 236
                                            y: 116
                                        }
                                    }
                                ]
                                details: [
                                    {
                                        vertical: true
                                        secondContainerFakeId: 1
                                    }
                                    {
                                        vertical: true
                                        firstContainerFakeId: 1
                                    }
                                    {
                                        vertical: false
                                        secondContainerFakeId: 1
                                    }
                                    {
                                        vertical: false
                                        firstContainerFakeId: 1
                                    }
                                ]
                            }
                        }
                    ) {
                        elevation: elevations {
                            id
                        }
                    }
                }
            `,
        }
    }).then(({
        body,
        // body: {
        //     data: {
        //         updateEntireElevation: {
        //             elevation: {
        //                 id,
        //             },
        //         },
        //     },
        // },
    }) => console.log(body))
));

Cypress.Commands.add("deleteSampleElevation", id => (
    cy.request({
        method: "POST",
        url: "http://localhost:5001/graphql",
        headers: getHeaders(),
        body: {
            query: `
                mutation: {
                    deleteEntireElevation (
                        input: {
                            elevationId: ${id}
                        }
                    ) {
                        elevationId: integer
                    }
                }
            `,
        },
    })
));
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
