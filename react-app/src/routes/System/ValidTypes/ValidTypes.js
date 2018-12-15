import React from 'react';

import {
    Wizard,
    ApolloListWrapper,
    SelectionWrapper,
    HeadedListContainer,
    Pill,
} from '../../../components';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import InputWrapper3 from '../../../components/ApolloInputWrapper/InputWrapper3'

import { query, mutations } from './valid-types-graphql';

export default function ValidTypes({ match: { params: { systemNID } } }) {
    return (
        <Wizard
            mutations={mutations}
            query={{
                query,
                variables: {
                    nodeId: systemNID,
                },
                mapProps: ({
                    status: {
                        data: {
                            system: {
                                manufacturerByManufacturerId: manufacturer,
                                systemTypeBySystemTypeId: {
                                    systemTypeDetailTypesBySystemTypeId: {
                                        nodes: systemTypeDetailTypes = [],
                                    } = {},
                                    systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
                                        nodes: systemTypeDetailTypeConfigurationTypes = [],
                                    } = {},
                                    ...systemType
                                } = {},
                                systemConfigurationOverridesBySystemId: {
                                    nodes: systemConfigurationOverrides = [],
                                } = {},
                                invalidSystemConfigurationTypesBySystemId: {
                                    nodes: invalidSystemConfigurationTypes = [],
                                } = {},
                                ...system
                            } = {}
                        } = {}
                    }
                }) => ({
                    system,
                    systemType,
                    manufacturer,
                    systemTypeDetailTypes,
                    systemTypeDetailTypeConfigurationTypes,
                    systemConfigurationOverrides,
                    invalidSystemConfigurationTypes,
                }),
            }}
        >
            {({
                system,
                system: {
                    id: systemId
                },
                systemType,
                manufacturer,
                systemTypeDetailTypes,
                systemTypeDetailTypeConfigurationTypes,
                systemConfigurationOverrides,
                invalidSystemConfigurationTypes,
                createInvalidSystemConfigurationType,
                deleteInvalidSystemConfigurationType,
            }) => (
                    <ListWrapper3
                        title="Valid Detail Types"
                        items={systemTypeDetailTypes}
                        mapPillProps={({
                            detailTypeByDetailTypeId: {
                                type
                            }
                        }) => ({
                            title: type
                        })}
                    >
                        {({
                            detailTypeByDetailTypeId: {
                                type: detailTypeName,
                                nodeId: detailTypeNID,
                            } = {}
                        }) => (
                                <ListWrapper3
                                    title="Valid Configuration Types"
                                    parent={detailTypeName}
                                    items={systemTypeDetailTypeConfigurationTypes
                                        .filter(({
                                            detailTypeByDetailTypeId: {
                                                nodeId
                                            }
                                        }) => nodeId === detailTypeNID)}
                                    mapPillProps={({
                                        configurationTypeByConfigurationTypeId: {
                                            nodeId,
                                            id,
                                            type
                                        }
                                    }) => {
                                        const invalidSystemConfigurationType = invalidSystemConfigurationTypes
                                            .find(({
                                                configurationTypeByInvalidConfigurationTypeId: {
                                                    nodeId: invalidNID,
                                                }
                                            }) => invalidNID === nodeId);
                                        return {
                                            title: type,
                                            arguments: {
                                                nodeId,
                                                id,
                                                invalidSystemConfigurationType,
                                            },
                                            disabled: !!invalidSystemConfigurationType
                                        };
                                    }}
                                    onDelete={({
                                        arguments: {
                                            id
                                        }
                                    }) => createInvalidSystemConfigurationType({
                                        systemId,
                                        invalidConfigurationTypeId: id,
                                    })}
                                    onDisabledSelect={({
                                        arguments: {
                                            invalidSystemConfigurationType
                                        }
                                    }) => deleteInvalidSystemConfigurationType(invalidSystemConfigurationType)}
                                >
                                    {({
                                        required,
                                        mirrorable,
                                    }) => (
                                            <InputWrapper3
                                                inputs={[
                                                    {
                                                        label: "Required",
                                                        type: "checkbox",
                                                        value: required || false,
                                                        // onChange: 
                                                    },
                                                    {
                                                        label: "Mirrorable",
                                                        type: "checkbox",
                                                        value: mirrorable || false,
                                                        // onChange: 
                                                    }
                                                ]}
                                            />
                                        )}
                                </ListWrapper3>
                            )}
                    </ListWrapper3>
                    // <SelectionWrapper>
                    //     {({
                    //         selectedNID,
                    //         handleSelect,
                    //     }) => (
                    //             <HeadedListContainer
                    //                 list={{
                    //                     items: systemTypeDetailTypes,
                    //                     renderItem: ({
                    //                         nodeId,
                    //                         detailTypeByDetailTypeId: {
                    //                             type
                    //                         }
                    //                     }) => (
                    //                             <Pill
                    //                                 arguments={{ nodeId }}
                    //                                 title={type}
                    //                                 onSelect={handleSelect}
                    //                             />
                    //                         )
                    //                 }}
                    //             >

                    //             </HeadedListContainer>
                    //         )}
                    // </SelectionWrapper>
                )}
        </Wizard>
        // <ApolloListWrapper
        //     apolloProps={{
        //         ...apolloProps,
        //         queryVariables: { nodeId: systemNID },
        //     }}
        //     itemClass="Valid Detail Types"
        //     plural={false}
        //     extractList={({
        //         system: {
        //             systemTypeBySystemTypeId: {
        //                 systemTypeDetailTypesBySystemTypeId: {
        //                     nodes = []
        //                 } = {}
        //             } = {}
        //         } = {},
        //     }) => nodes}
        //     mapPillProps={({ detailTypeByDetailTypeId: { type } }) => ({
        //         title: type,
        //     })}
        // >
        //     {({
        //         apollo: {
        //             queryStatus: {
        //                 data,
        //                 data: {
        //                     system: {
        //                         systemTypeBySystemTypeId: {
        //                             systemTypeDetailTypeConfigurationTypesBySystemTypeId: {
        //                                 nodes: systemTypeDetailTypeConfigurationTypes = []
        //                             } = {}
        //                         } = {}
        //                     } = {}
        //                 }
        //             }
        //         },
        //         selectedItem,
        //     }) => (
        //             <ApolloListWrapper
        //                 n={console.log({
        //                     systemTypeDetailTypeConfigurationTypes,
        //                     selectedItem,
        //                 })}
        //                 apolloProps={{
        //                     ...configurationApolloProps,
        //                     batchMutations: true
        //                 }}
        //                 itemClass="Valid Configuration Types"
        //                 plural={false}
        //                 extractList={() => systemTypeDetailTypeConfigurationTypes
        //                     .filter(({
        //                         detailTypeByDetailTypeId: {
        //                             nodeId
        //                         }
        //                     }) => nodeId === selectedItem.detailTypeByDetailTypeId.nodeId)
        //                 }
        //                 mapPillProps={({ configurationTypeByConfigurationTypeId: { type } }) => ({
        //                     title: type
        //                 })}
        //             >

        //             </ApolloListWrapper>
        //         )}
        // </ApolloListWrapper>
    );
}
