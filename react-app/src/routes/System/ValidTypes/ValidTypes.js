import React from 'react';

import {
    Wizard,
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
                }) => ({
                    system,
                    manufacturer,
                    systemTypeDetailTypes,
                    systemTypeDetailTypeConfigurationTypes,
                    systemType,
                    systemConfigurationOverrides,
                    invalidSystemConfigurationTypes,
                })
            }}
        >
            {({
                queryStatus: {
                    system: {
                        id: systemId
                    },
                    manufacturer,
                    systemTypeDetailTypes,
                    systemTypeDetailTypeConfigurationTypes,
                    systemType,
                    systemConfigurationOverrides,
                    invalidSystemConfigurationTypes,
                },
                mutations: {
                    createInvalidSystemConfigurationType,
                    deleteInvalidSystemConfigurationType,
                },
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
                                                title="System Configuration Type"
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
                )}
        </Wizard>
    );
}
