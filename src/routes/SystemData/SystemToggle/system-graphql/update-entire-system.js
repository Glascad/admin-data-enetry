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
            system:systems{
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
    mapMutationArgumentsToProps: ({
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
            manufacturerId,
            systemTypeId,
            _manufacturer,
            _systemType,
            _systemSystemTags,
            _systemInfillSizes,
            _systemInfillPocketSizes,
            _systemInfillPocketTypes,
        },
        allManufacturers,
        allSystemTypes,
        allSystemTags,
        allInfillPocketTypes,
    }) => ({
        system: {
            ...system,
            name: newName === undefined ? name : newName,
            _manufacturer: newManufacturerId && newManufacturerId !== manufacturerId ?
                allManufacturers.find(({ id }) => id === newManufacturerId)
                :
                _manufacturer,
            _systemType: newSystemTypeId && newSystemTypeId !== systemTypeId ?
                allSystemTypes.find(({ id }) => id === newSystemTypeId)
                :
                _systemType,
            depth: newDepth || depth,
            defaultSightline: newDefaultSightline || defaultSightline,
            shimSize: newShimSize || shimSize,
            defaultGlassSize: newDefaultGlassSize || defaultGlassSize,
            defaultGlassBite: newDefaultGlassBite | defaultGlassBite,
            _systemSystemTags: _systemSystemTags
                // remove `old` items
                .filter(({ _systemTag: { id } }) => !oldSystemTags.includes(id))
                // add `new` items
                .concat(newSystemTags
                    .map(systemTagId => ({
                        _systemTag: allSystemTags
                            .find(({ id }) => id === systemTagId)
                    }))
                ),
            _systemInfillSizes: _systemInfillSizes
                .filter(({ infillSize }) => !oldInfillSizes.includes(infillSize))
                .concat(newInfillSizes
                    .map(infillSize => ({ infillSize }))
                ),
            _systemInfillPocketTypes: _systemInfillPocketTypes
                .filter(({ infillPocketTypeId }) => !oldInfillPocketTypes.includes(infillPocketTypeId))
                .concat(newInfillPocketTypes
                    .map(infillPocketTypeId => ({
                        infillPocketTypeId,
                        _infillPocketType: allInfillPocketTypes
                            .find(({ id }) => id === infillPocketTypeId)
                    }))
                ),
            _systemInfillPocketSizes: _systemInfillPocketSizes
                .filter(({ infillPocketSize }) => !oldInfillPocketSizes.includes(infillPocketSize))
                .concat(newInfillPocketSizes
                    .map(infillPocketSize => ({ infillPocketSize }))
                ),
        },
    }),
};
