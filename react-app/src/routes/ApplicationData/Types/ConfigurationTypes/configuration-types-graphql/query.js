import gql from 'graphql-tag';

export default {
    query: gql`{
        allConfigurationTypes{
            nodes{
                nodeId
                id
                type
                door
                overrideLevel
                presentationLevel
                configurationTypePartTypesByConfigurationTypeId{
                    nodes{
                        nodeId
                        partTypeByPartTypeId{
                            nodeId
                            id
                            type
                        }
                    }
                }
                configurationNameOverridesByConfigurationTypeId{
                    nodes{
                        nodeId
                        nameOverride
                        manufacturerByManufacturerId{
                            nodeId
                            id
                            name
                        }
                    }
                }
            }
        }
        allPartTypes{
            nodes{
                nodeId
                id
                type
            }
        }
        allManufacturers{
            nodes{
                nodeId
                id
                name
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allConfigurationTypes: {
                nodes: configurationTypes = [],
            } = {},
            allPartTypes: {
                nodes: allPartTypes = [],
            } = {},
            allManufacturers: {
                nodes: allManufacturers = [],
            } = {},
        } = {},
    }) => ({
            configurationTypes,
            allPartTypes,
            allManufacturers,
    }),
};