import React from 'react';

import {
    HeadedContainer,
    Input,
    ListWrapper,
} from '../../../../../components';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
            systemType: {
                systemTypeDetailTypes = [],
                systemTypeDetailTypeConfigurationTypes = [],
            } = {},
            invalidSystemConfigurationTypes = [],
        } = {},
    },
    mutations: {
        createInvalidSystemConfigurationType,
        deleteInvalidSystemConfigurationType,
    },
}) {
    return (
        <ListWrapper
            title="Valid Detail Types"
            items={systemTypeDetailTypes}
            mapPillProps={({
                detailType: {
                    type
                }
            }) => ({
                title: type
            })}
        >
            {({
                detailType: {
                    type: detailTypeName = '',
                    nodeId: detailTypeNID,
                } = {}
            }) => (
                    <ListWrapper
                        title={`Valid Configuration Types - ${detailTypeName}`}
                        // parent={detailTypeName}
                        items={systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailType: {
                                    nodeId
                                }
                            }) => nodeId === detailTypeNID)}
                        mapPillProps={({
                            nodeId,
                            configurationType: {
                                nodeId: configurationTypeNID,
                                id,
                                type
                            }
                        }) => {
                            const invalidSystemConfigurationType = invalidSystemConfigurationTypes
                                .find(({
                                    configurationType: {
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
                            configurationType: {
                                type: configurationTypeName = '',
                            } = {},
                            ...data
                        }) => (
                                <div className="unfinished">
                                    <HeadedContainer
                                        title={`System Configuration Type - ${configurationTypeName}`}
                                    >
                                        <Input
                                            label="Required"
                                            type="checkbox"
                                            checked={required || false}
                                            onChange={({ target: { checked } }) => ({
                                                data,
                                                checked,
                                            })}
                                        />
                                        <Input
                                            label="Mirrorable"
                                            type="checkbox"
                                            checked={required}
                                            onChange={({ target: { checked } }) => ({
                                                data,
                                                checked,
                                            })}
                                        />
                                    </HeadedContainer>
                                </div>
                            )}
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}
