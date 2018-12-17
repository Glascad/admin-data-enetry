import gql from 'graphql-tag';

export const query = gql`query SystemInfo($nodeId:ID!){
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
                    systemTypeId
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
                systemId
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
                systemId
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
                    systemId
                    systemBySystemId{
                        nodeId
                    }
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
        mapResultToProps: ({
            nodeId,
            systemId,
            invalidConfigurationTypeId,
        }, {
            systemTypeDetailTypeConfigurationTypes,
            invalidSystemConfigurationTypes,
        }) => {
            const {
                configurationTypeByConfigurationTypeId
            } = systemTypeDetailTypeConfigurationTypes.find(({
                configurationTypeId
            }) => configurationTypeId === invalidConfigurationTypeId);
            const invalidSystemConfigurationType = {
                nodeId,
                systemId,
                invalidConfigurationTypeId,
                configurationTypeByInvalidConfigurationTypeId: configurationTypeByConfigurationTypeId,
            };
            return {
                invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                    .concat(invalidSystemConfigurationType)
            };
        },
        refetchQueries: ({
            data: {
                createInvalidSystemConfigurationType: {
                    invalidSystemConfigurationType: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    },
    deleteInvalidSystemConfigurationType: {
        mutation: gql`mutation DeleteInvalidSystemConfigurationType(
            $nodeId:ID!
        ){
            deleteInvalidSystemConfigurationType(
                input:{
                    nodeId:$nodeId
                }
            ){
                invalidSystemConfigurationType{
                    nodeId
                    systemId
                    systemBySystemId{
                        nodeId
                    }
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
        mapResultToProps: ({
            nodeId,
            systemId,
            invalidConfigurationTypeId,
        }, {
            invalidSystemConfigurationTypes,
        }) => {
            return {
                invalidSystemConfigurationTypes: invalidSystemConfigurationTypes
                    .filter(invalid => invalid.nodeId !== nodeId && (
                        invalid.systemId !== systemId
                        ||
                        invalid.invalidConfigurationTypeId !== invalidConfigurationTypeId
                    ))
            };
        },
        refetchQueries: ({
            data: {
                deleteInvalidSystemConfigurationType: {
                    invalidSystemConfigurationType: {
                        systemBySystemId: {
                            nodeId
                        }
                    }
                }
            }
        }) => [{ query, variables: { nodeId } }]
    }
};
