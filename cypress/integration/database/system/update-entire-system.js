import { getBaseRequest } from "../../../support/commands";

const gql = ([str]) => str;

describe('Update entire system tests', () => {
    beforeEach(() => {
        cy.login();
    });
    it('can create an empty new system', () => {
        cy.request({
            ...getBaseRequest(),
            body: {
                query: gql`
                    mutation: {
                        updateEntireSystem(input: {
                            system: {
                                id: 2
                                name: "Test System"
                                manufacturerId: 1
                                systemType: STOREFRONT
                                systemOptions: [
                                    {
                                        id: 3
                                        fakeId: 1
                                        name: SET
                                        values: [
                                            {
                                                fakeId: 2
                                                name: FRONT
                                            }
                                            {
                                                fakeId: 3
                                                name: CENTER
                                            }
                                        ]
                                        parentSystemOptionValueFakeId: 1
                                    }
                                    {
                                        id: 4
                                        fakeId: 2
                                        parentSystemOptionValueFakeId: 3
                                        parentSystemOptionValueId: 3
                                        name: JOINERY
                                        values: [
                                            {
                                                id: 10
                                                fakeId: 4
                                                name: STICK
                                            }
                                            {
                                                fakeId: 5
                                                name: SHEAR_BLOCK
                                            }
                                        ]
                                        valueIdsToDelete: [11]
                                    }
                                ]
                                systemOptionIdsToDelete: [4]
                            }
                        }) {
                            system {
                                id
                                name
                                systemType
                                systemOptionsBySystemId(orderBy: PARENT_SYSTEM_OPTION_VALUE_ID_ASC) {
                                    nodes {
                                        parentSystemOptionValueId
                                        id
                                        name
                                        systemOptionValuesBySystemOptionId(orderBy: ID_ASC) {
                                            nodes {
                                                id
                                                name
                                                raisedOptionNames
                                                raisedConfigurationTypes
                                                systemDetailsBySystemOptionValueId(orderBy: ID_ASC) {
                                                    nodes {
                                                        id
                                                        detailType
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                detailOptionsBySystemId(orderBy: PARENT_DETAIL_OPTION_VALUE_ID_ASC) {
                                    nodes {
                                        systemDetailId
                                        parentDetailOptionValueId
                                        id
                                        name
                                        detailOptionValuesByDetailOptionId(orderBy: ID_ASC) {
                                            nodes {
                                            id
                                            name
                                            systemConfigurationsByDetailOptionValueId(orderBy: ID_ASC) {
                                                nodes {
                                                    id
                                                    configurationType
                                                    optional
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                configurationOptionsBySystemId(orderBy: PARENT_CONFIGURATION_OPTION_VALUE_ID_ASC) {
                                    nodes {
                                        systemConfigurationId
                                        parentConfigurationOptionValueId
                                        id
                                        name
                                        configurationOptionValuesByConfigurationOptionId(orderBy: ID_ASC) {
                                            nodes {
                                                id
                                                name
                                                configurationsByConfigurationOptionValueId(orderBy: ID_ASC) {
                                                    nodes {
                                                        id
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            }
        })
    });
});
