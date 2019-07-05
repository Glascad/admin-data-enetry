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
Cypress.Commands.add("login", ({ username, password }) => {
    cy.request({
        method: "POST",
        url: "/graphql",
        body: {
            query: `
                mutation {
                    authenticate(
                        input: {
                            username: "${username}"
                            password: "${password}"
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
    }) => {
        window.localStorage.setItem("JSON-Web-Token", jwt);
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
