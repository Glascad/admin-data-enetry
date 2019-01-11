import gql from 'graphql-tag';

export default {
    query: gql`query System($nodeId:ID!){
        system(nodeId:$nodeId){
            nodeId
            id
            name
            defaultGlassSize
            defaultGlassBite
            depth
            defaultSightline
            shimSize
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
            systemInfillSizesBySystemId{
                nodes{
                    nodeId
                    infillSize
                    infillSizeByInfillSize{
                        nodeId
                        size
                    }
                }
            }
            systemInfillPocketTypesBySystemId{
                nodes{
                    nodeId
                    infillPocketTypeByInfillPocketTypeId{
                        nodeId
                        id
                        type
                        captured
                        description
                    }
                }
            }
            systemInfillPocketSizesBySystemId{
                nodes{
                    nodeId
                    infillPocketSizeByInfillPocketSize{
                        nodeId
                        size
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
            systemOptionsBySystemId {
                nodes {
                    nodeId
                    id
                    name
                    systemId
                    mirrorable
                    optionOrder
                    overrideLevel
                    presentationLevel
                    optionValuesBySystemOptionId {
                        nodes {
                            nodeId
                            id
                            name
                            value
                        }
                    }
                    systemOptionConfigurationTypesBySystemOptionId{
                        nodes{
                            nodeId
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
            optionCombinationsBySystemId{
                nodes{
                    nodeId
                    id
                    invalid
                    optionCombinationConfigurationTypesByOptionCombinationId{
                        nodes{
                            nodeId
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
                    optionCombinationOptionValuesByOptionCombinationId{
                        nodes{
                            nodeId
                            optionValueByOptionValueId{
                                nodeId
                                id
                                name
                                value
                                systemOptionBySystemOptionId{
                                    nodeId
                                    id
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }`,
    mapQueryToProps: ({
        data: {
            system: {
                manufacturerByManufacturerId: manufacturer = {},
                systemTypeBySystemTypeId: systemType = {},
                systemTypeBySystemTypeId: {
                    systemTypeDetailTypesBySystemTypeId: {
                        nodes: systemTypeDetailTypes = [],
                    } = {},
                    systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
                        nodes: systemTypeDetailTypeConfigurationTypes = [],
                    } = {},
                } = {},
                systemSystemTagsBySystemId: {
                    nodes: systemSystemTags = []
                } = {},
                systemInfillSizesBySystemId: {
                    nodes: systemInfillSizes = []
                } = {},
                systemInfillPocketTypesBySystemId: {
                    nodes: systemInfillPocketTypes = []
                } = {},
                systemInfillPocketSizesBySystemId: {
                    nodes: systemInfillPocketSizes = []
                } = {},
                systemConfigurationOverridesBySystemId: {
                    nodes: systemConfigurationOverrides = []
                } = {},
                invalidSystemConfigurationTypesBySystemId: {
                    nodes: invalidSystemConfigurationTypes = []
                } = {},
                systemOptionsBySystemId: {
                    nodes: systemOptions = []
                } = {},
                optionCombinationsBySystemId: {
                    nodes: optionCombinations = []
                } = {},
                ...system
            } = {},
        } = {},
    }) => ({
        system,
        manufacturer,
        systemType,
        systemTypeDetailTypes,
        systemTypeDetailTypeConfigurationTypes,
        systemSystemTags,
        systemSystemTags,
        systemInfillSizes,
        systemInfillPocketTypes,
        systemInfillPocketSizes,
        systemConfigurationOverrides,
        invalidSystemConfigurationTypes,
        systemOptions,
        optionCombinations,
    }),
};