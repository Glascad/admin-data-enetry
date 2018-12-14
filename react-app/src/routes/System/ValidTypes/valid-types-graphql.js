import gql from 'graphql-tag';

export const query =
    // { query:
    gql`query SystemInfo($nodeId:ID!){
        system(nodeId:$nodeId){
            nodeId
            id
            name
            manufacturerByManufacturerId{
                nodeId
                id
                name
            }
            systemTypeBySystemTypeId{
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
                            type
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
            systemConfigurationOverridesBySystemId{
                nodes{
                    nodeId
                    detailTypeId
                    detailTypeByDetailTypeId{
                        nodeId
                        id
                        type
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
            invalidSystemConfigurationTypesBySystemId{
                nodes{
                    nodeId
                    invalidConfigurationTypeId
                    configurationTypeByInvalidConfigurationTypeId{
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
    }`;
// };

export const mutations = {
    createInvalidSystemConfigurationType: {
        mutation: gql`mutation CreateInvalidSystemConfigurationType(
            $systemId:Int!,
            $invalidConfigurationTypeId:Int!
        ){
            createInvalidSystemConfigurationType(
                input:{
                    invalidSystemConfigurationType:{
                        systemId:$systemId,
                        invalidConfigurationTypeId:$invalidConfigurationTypeId
                    }
                }
            ){
                invalidSystemConfigurationType{
                    nodeId
                    invalidConfigurationTypeId
                    configurationTypeByInvalidConfigurationTypeId{
                        nodeId
                        id
                        type
                        door
                        overrideLevel
                        presentationLevel
                    }
                }
            }
        }`,
        mapResultToProps: ({ variables }, props) => ({
            ...props,
            n: console.log({ variables, props })
        })
    }
};
