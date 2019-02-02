import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateEntireSystem(
        $id: Int,
        $newName: String,
        $newManufacturerId: Int,
        $newSystemTypeId: Int,
        $newDepth: Float,
        $newDefaultSightline: Float,
        $newShimSize: Float,
        $newDefaultGlassSize: Float,
        $newDefaultGlassBite: Float,
        $newSystemTags: [Int],
        $oldSystemTags: [Int],
        $newInfillSizes: [Float],
        $oldInfillSizes: [Float],
        $newInfillPocketSizes: [Float],
        $oldInfillPocketSizes: [Float],
        $newInfillPocketTypes: [Int],
        $oldInfillPocketTypes: [Int]
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
    mapResultToProps: ({
        newName,
        newManufacturerId,
        newSystemTypeId,
        newDepth,
        newDefaultSightline,
        newShimSize,
        newDefaultGlassSize,
        newDefaultGlassBite,
        newSystemTags = [],
        oldSystemTags = [],
        newInfillSizes = [],
        oldInfillSizes = [],
        newInfillPocketSizes = [],
        oldInfillPocketSizes = [],
        newInfillPocketTypes = [],
        oldInfillPocketTypes = [],
    }, {
        system,
        system: {
            name,
            depth,
            defaultSightline,
            shimSize,
            defaultGlassSize,
            defaultGlassBite,
            manufacturer,
            systemType,
            systemSystemTags,
            systemInfillSizes,
            systemInfillPocketSizes,
            systemInfillPocketTypes,
        },
        allManufacturers,
        allSystemTypes,
        allSystemTags,
        allInfillSizes,
        allInfillPocketTypes,
        allInfillPocketSizes,
    }) => ({
        system: {
            ...system,
            name: newName === undefined ? name : newName,
            manufacturer: newManufacturerId ?
                allManufacturers.find(({ id }) => id === newManufacturerId)
                :
                manufacturer,
            systemType: newSystemTypeId ?
                allSystemTypes.find(({ id }) => id === newSystemTypeId)
                :
                systemType,
            depth: newDepth || depth,
            defaultSightline: newDefaultSightline || defaultSightline,
            shimSize: newShimSize || shimSize,
            defaultGlassSize: newDefaultGlassSize || defaultGlassSize,
            defaultGlassBite: newDefaultGlassBite | defaultGlassBite,
            systemSystemTags: systemSystemTags
                .filter(({ systemTag: { id } }) => !oldSystemTags.includes(id))
                .concat(newSystemTags
                    .map(systemTagId => ({
                        systemTag: allSystemTags
                            .find(({ id }) => id === systemTagId),
                    }))
                ),
            systemInfillSizes: systemInfillSizes
                .filter(({ infillSize }) => !oldInfillSizes.includes(infillSize))
                .concat(newInfillSizes
                    .map(infillSize => allInfillSizes
                        .find(({ size }) => size === infillSize)
                    )
                ),
            systemInfillPocketSizes: systemInfillPocketSizes
                .filter(({ infillPocketSize }) => !oldInfillPocketSizes.includes(infillPocketSize))
                .concat(newInfillPocketSizes
                    .map(infillPocketSize => allInfillPocketSizes
                        .find(({ size }) => size === infillPocketSize)
                    )
                ),
            systemInfillPocketTypes: systemInfillPocketTypes
                .filter(({ infillPocketTypeId }) => !oldInfillPocketTypes.includes(infillPocketTypeId))
                .concat(newInfillPocketTypes
                    .map(infillPocketTypeId => allInfillPocketTypes
                        .find(({ id }) => id === infillPocketTypeId)
                    )
                ),
        }
    })
};
