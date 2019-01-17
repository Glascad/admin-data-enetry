import gql from 'graphql-tag';

export default {
    query: gql`{
        allSystemTypes{
            nodes{
                nodeId
                id
                type
                systemTypeDetailTypesBySystemTypeId{
                    nodes{
                        nodeId
                        detailTypeByDetailTypeId{
                            nodeId
                            id
                            type
                            vertical
                            entrance
                        }
                    }
                }
                systemTypeDetailTypeConfigurationTypesBySystemTypeId{
                    nodes{
                        nodeId
                        required
                        mirrorable
                        detailTypeId
                        detailTypeByDetailTypeId{
                            nodeId
                            id
                        }
                        configurationTypeId
                        configurationTypeByConfigurationTypeId{
                            nodeId
                            id
                            type
                            door
                            overrideLevel
                            presentationLevel
                        }
                    }
                }
            }
        }
        allDetailTypes{
            nodes{
                nodeId
                id
                type
                vertical
                entrance
            }
        }
        allConfigurationTypes{
            nodes{
                nodeId
                id
                type
                door
                overrideLevel
                presentationLevel
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            allSystemTypes: {
                nodes: systemTypes = []
            } = {},
            allDetailTypes: {
                nodes: allDetailTypes = []
            } = {},
            allConfigurationTypes: {
                nodes: allConfigurationTypes = []
            } = {},
        } = {},
    }) => ({
            systemTypes,
            allDetailTypes,
            allConfigurationTypes,
    }),
};
