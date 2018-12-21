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
            systemSystemTagsBySystemId{
                nodes{
                    nodeId
                    systemTagBySystemTagId{
                        nodeId
                        id
                        tag
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
        allSystemTypes{
            nodes{
                nodeId
                id
                type
            }
        }
        allSystemTags{
            nodes{
                nodeId
                id
                tag
            }
        }
        allInfillSizes{
            nodes{
                nodeId
                size
            }
        }
        allInfillPocketTypes{
            nodes{
                nodeId
                id
                type
            }
        }
        allInfillPocketSizes{
            nodes{
                nodeId
                size
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
            allSystemTypes: {
                nodes: allSystemTypes = []
            } = {},
            allSystemTags: {
                nodes: allSystemTags = []
            } = {},
            allInfillSizes: {
                nodes: allInfillSizes = []
            } = {},
            allInfillPocketTypes: {
                nodes: allInfillPocketTypes = []
            } = {},
            allInfillPocketSizes: {
                nodes: allInfillPocketSizes = []
            } = {},
            allConfigurationTypes: {
                nodes: allConfigurationTypes = []
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
        systemConfigurationOverrides,
        invalidSystemConfigurationTypes,
        systemOptions,
        optionCombinations,
        allSystemTypes,
        allSystemTags,
        allInfillSizes,
        allInfillPocketTypes,
        allInfillPocketSizes,
        allConfigurationTypes,
    }),
};