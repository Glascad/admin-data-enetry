import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateEntireSystem(
        $id: Int,
        $name: String,
        $manufacturerId: Int,
        $systemTypeId: Int,
        $depth: Float,
        $defaultSightline: Float,
        $shimSize: Float,
        $defaultGlassSize: Float,
        $defaultGlassBite: Float,
        $systemTagIds: [Int],
        $systemTagIdsToDelete: [Int],
        $infillSizes: [Float],
        $infillSizesToDelete: [Float],
        $infillPocketSizes: [Float],
        $infillPocketSizesToDelete: [Float],
        $infillPocketTypeIds: [Int],
        $infillPocketTypeIdsToDelete: [Int],
        $systemOptions: [EntireSystemOptionInput],
        $systemOptionsToDelete: [Int]
    ){
        updateEntireSystem(
            input:{
                system:{
                    id: $id,
                    name: $name,
                    manufacturerId: $manufacturerId,
                    systemTypeId: $systemTypeId,
                    depth: $depth,
                    defaultSightline: $defaultSightline,
                    shimSize: $shimSize,
                    defaultGlassSize: $defaultGlassSize,
                    defaultGlassBite: $defaultGlassBite,
                    systemTagIds: $systemTagIds,
                    systemTagIdsToDelete: $systemTagIdsToDelete,
                    infillSizes: $infillSizes,
                    infillSizesToDelete: $infillSizesToDelete,
                    infillPocketSizes: $infillPocketSizes,
                    infillPocketSizesToDelete: $infillPocketSizesToDelete,
                    infillPocketTypeIds: $infillPocketTypeIds,
                    infillPocketTypeIdsToDelete: $infillPocketTypeIdsToDelete,
                    systemOptions:$systemOptions,
                    systemOptionsToDelete:$systemOptionsToDelete
                }
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
    // mapMutationArgumentsToProps: ({
    //     name,
    //     manufacturerId,
    //     systemTypeId,
    //     depth,
    //     defaultSightline,
    //     shimSize,
    //     defaultGlassSize,
    //     defaultGlassBite,
    //     systemTagIds = [],
    //     systemTagIdsToDelete = [],
    //     infillSizes = [],
    //     infillSizesToDelete = [],
    //     infillPocketSizes = [],
    //     infillPocketSizesToDelete = [],
    //     infillPocketTypeIds = [],
    //     infillPocketTypeIdsToDelete = [],
    // }, {
    //     system,
    //     system: {
    //         name,
    //         depth,
    //         defaultSightline,
    //         shimSize,
    //         defaultGlassSize,
    //         defaultGlassBite,
    //         manufacturerId,
    //         systemTypeId,
    //         _manufacturer,
    //         _systemType,
    //         _systemSystemTags,
    //         _systemInfillSizes,
    //         _systemInfillPocketSizes,
    //         _systemInfillPocketTypes,
    //     },
    //     allManufacturers,
    //     allSystemTypes,
    //     allSystemTags,
    //     allInfillPocketTypes,
    // }) => ({
    //     system: {
    //         ...system,
    //         name: name === undefined ? name : name,
    //         _manufacturer: manufacturerId && manufacturerId !== manufacturerId ?
    //             allManufacturers.find(({ id }) => id === manufacturerId)
    //             :
    //             _manufacturer,
    //         _systemType: systemTypeId && systemTypeId !== systemTypeId ?
    //             allSystemTypes.find(({ id }) => id === systemTypeId)
    //             :
    //             _systemType,
    //         depth: depth || depth,
    //         defaultSightline: defaultSightline || defaultSightline,
    //         shimSize: shimSize || shimSize,
    //         defaultGlassSize: defaultGlassSize || defaultGlassSize,
    //         defaultGlassBite: defaultGlassBite | defaultGlassBite,
    //         _systemSystemTags: _systemSystemTags
    //             // remove `` items
    //             .filter(({ _systemTag: { id } }) => !systemTagIdsToDelete.includes(id))
    //             // add `` items
    //             .concat(systemTagIds
    //                 .map(systemTagId => ({
    //                     _systemTag: allSystemTags
    //                         .find(({ id }) => id === systemTagId)
    //                 }))
    //             ),
    //         _systemInfillSizes: _systemInfillSizes
    //             .filter(({ infillSize }) => !infillSizesToDelete.includes(infillSize))
    //             .concat(infillSizes
    //                 .map(infillSize => ({ infillSize }))
    //             ),
    //         _systemInfillPocketTypes: _systemInfillPocketTypes
    //             .filter(({ infillPocketTypeId }) => !infillPocketTypeIdsToDelete.includes(infillPocketTypeId))
    //             .concat(infillPocketTypeIds
    //                 .map(infillPocketTypeId => ({
    //                     infillPocketTypeId,
    //                     _infillPocketType: allInfillPocketTypes
    //                         .find(({ id }) => id === infillPocketTypeId)
    //                 }))
    //             ),
    //         _systemInfillPocketSizes: _systemInfillPocketSizes
    //             .filter(({ infillPocketSize }) => !infillPocketSizesToDelete.includes(infillPocketSize))
    //             .concat(infillPocketSizes
    //                 .map(infillPocketSize => ({ infillPocketSize }))
    //             ),
    //     },
    // }),
};
