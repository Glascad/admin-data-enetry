import React from 'react';

import {
    HeadedContainer,
    Input,
} from '../../../../components';

import ListWrapper3 from '../../../../components/ApolloListWrapper/ListWrapper3';

export default function ValidTypes({
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
}) {
    return (
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
                    type: detailTypeName = '',
                    nodeId: detailTypeNID,
                } = {}
            }) => (
                    <ListWrapper3
                        title={`Valid Configuration Types - ${detailTypeName}`}
                        // parent={detailTypeName}
                        items={systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailTypeByDetailTypeId: {
                                    nodeId
                                }
                            }) => nodeId === detailTypeNID)}
                        mapPillProps={({
                            nodeId,
                            configurationTypeByConfigurationTypeId: {
                                nodeId: configurationTypeNID,
                                id,
                                type
                            }
                        }) => {
                            const invalidSystemConfigurationType = invalidSystemConfigurationTypes
                                .find(({
                                    configurationTypeByInvalidConfigurationTypeId: {
                                        nodeId: invalidNID,
                                    }
                                }) => invalidNID === configurationTypeNID);
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
                            configurationTypeByConfigurationTypeId: {
                                type: configurationTypeName = '',
                            } = {},
                            ...data
                        }) => (
                                <HeadedContainer
                                    title={`System Configuration Type - ${configurationTypeName}`}
                                // parent={configurationTypeName}
                                >
                                    <Input
                                        label="Required"
                                        type="checkbox"
                                        checked={required || false}
                                        onChange={({ target: { checked } }) => console.log({
                                            data,
                                            checked,
                                        })}
                                    />
                                    <Input
                                        label="Mirrorable"
                                        type="checkbox"
                                        checked={required}
                                        onChange={({ target: { checked } }) => console.log({
                                            data,
                                            checked,
                                        })}
                                    />
                                </HeadedContainer>
                            )}
                    </ListWrapper3>
                )}
        </ListWrapper3>
    );
}
