import { getJwt, setJwt, getProjectId, setProjectId, getElevationId } from "./local-storage";

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

Cypress.Commands.add("getDataCy", (strings, interpolatedValues = []) => (
    cy.get(`[data-cy="${strings.reduce((acc, str, i) => `${acc}${str}${interpolatedValues[i] || ''}`, '')}"]`)
));

export const getBaseRequest = () => ({
    ...console.log({
        projectId: getProjectId(),
        elevationId: getElevationId(),
    }),
    method: "POST",
    // url: "https://dev.glascad.com/graphql",
    url: "/graphql",
    headers: {
        Authentication: `Bearer ${getJwt()}`,
    },
});

Cypress.Commands.add("setup", () => {
    console.log("Logging in");
    cy.login();
    console.log("Logged in");
    console.log(getJwt());
    console.log("Creating project")
    cy.createProject();
    console.log("Created Project");
    console.log(getProjectId());
    console.log("Creating Elevation");
    cy.createElevation();
    console.log(getElevationId());
    console.log("Created Elevation");
});

Cypress.Commands.add("cleanup", id => {
    cy.deleteProject(id);
});

Cypress.Commands.add("login", () => {
    cy.request({
        ...getBaseRequest(),
        body: {
            query: `
                mutation {
                    authenticate(
                        input: {
                            username: "${Cypress.env("USERNAME")}"
                            password: "${Cypress.env("PASSWORD")}"
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
    }) => setJwt(jwt));
});

Cypress.Commands.add("createProject", () => {
    cy.request({
        ...getBaseRequest(),
        body: {
            query: `
                mutation {
                    createOrUpdateProject (
                        input: {
                            name: "CYPRESS TEST PROJECT"
                        }
                    ) {
                        project {
                            id
                        }
                    }
                }
            `,
        },
    }).then(({
        body: {
            data: {
                createOrUpdateProject: {
                    project: {
                        id,
                    },
                },
            },
        },
    }) => setProjectId(id));
});

Cypress.Commands.add("createElevation", () => {
    cy.request({
        ...getBaseRequest(),
        body: {
            query: `
                mutation {
                    updateEntireElevation (
                        input: {
                            elevation: {
                                name: "CYPRESS TEST ELEVATION"
                                projectId: ${getProjectId()}
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
        ...body
        // body: {
        //     data: {
        //         updateEntireElevation: {
        //             elevation: {
        //                 id,
        //             },
        //         },
        //     },
        // },
    }) => console.log(body));
});

Cypress.Commands.add("deleteProject", () => {
    cy.request({
        ...getBaseRequest(),
        body: {
            query: `
                mutation: {
                    deleteEntireProject (
                        input: {
                            projectId: ${getProjectId()}
                        }
                    ) {
                        projectId: integer
                    }
                }
            `,
        },
    });
});
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
