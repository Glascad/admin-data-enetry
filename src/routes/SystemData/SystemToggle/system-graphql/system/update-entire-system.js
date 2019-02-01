import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateEntireSystem(
        $id: INTEGER,
        $newName: TEXT,
        $newManufacturerId: INTEGER,
        $newSystemTypeId: INTEGER,
        $newDepth: FLOAT,
        $newDefaultSightline: FLOAT,
        $newShimSize: FLOAT,
        $newDefaultGlassSize: FLOAT,
        $newDefaultGlassBite: FLOAT,
        $newSystemTags: [INTEGER],
        $oldSystemTags: [INTEGER],
        $newInfillSizes: [FLOAT],
        $oldInfillSizes: [FLOAT],
        $newInfillPocketSizes: [FLOAT],
        $oldInfillPocketSizes: [FLOAT],
        $newInfillPocketTypes: [INTEGER],
        $oldInfillPocketTypes: [INTEGER]
    ){
        updateEntireSystem(
            input:{
                id: $id,
                newName: $newName,
                newManufacturerId: $newManufacturerId,
                newSystemTypeId: $newSystemTypeId,
                newDepth: $newDepth,
                newDefaultSightline: $newDefaultSightline,
                newShimSize: $newShimSize,
                newDefaultGlassSize: $newDefaultGlassSize,
                newDefaultGlassBite: $newDefaultGlassBite,
                newSystemTags: $newSystemTags,
                oldSystemTags: $oldSystemTags,
                newInfillSizes: $newInfillSizes,
                oldInfillSizes: $oldInfillSizes,
                newInfillPocketSizes: $newInfillPocketSizes,
                oldInfillPocketSizes: $oldInfillPocketSizes,
                newInfillPocketTypes: $newInfillPocketTypes,
                oldInfillPocketTypes: $oldInfillPocketTypes
            }
        ){
            systems{
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
                    systemTypeDetailTypeConfigurationTypesBySystemTypeId{
                        nodes{
                            nodeId
                            mirrorable
                            required
                            presentationLevel
                            overrideLevel
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
                            }
                        }
                    }
                }
                systemConfigurationOverridesBySystemId{
                    nodes{
                        nodeId
                        mirrorableOverride
                        requiredOverride
                        presentationLevelOverride
                        overrideLevelOverride
                        systemId
                        systemTypeId
                        detailTypeId
                        configurationTypeId
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
                systemInfillPocketSizesBySystemId{
                    nodes{
                        nodeId
                        infillPocketSizeByInfillPocketSize{
                            nodeId
                            size
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
                        }
                    }
                }
                systemOptionsBySystemId {
                    nodes {
                        nodeId
                        id
                        name
                        systemId
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
        }
    }`,
    mapResultToProps: (newSystem, { system }) => ({
        system: {
            ...system,
            ...newSystem,
        }
    })
};
