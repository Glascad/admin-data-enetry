import React from 'react';

import {
    HeadedContainer,
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

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
            titleBar={{
                title: "Valid Detail Types"
            }}
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
                        titleBar={{
                            title: "Valid Configuration Types",
                            selections: [detailTypeName]
                        }}
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
                                    <TitleBar
                                        title="System Configuration Type"
                                        selections={[configurationTypeName]}
                                    />
                                    <Input
                                        label="Invalid"
                                        type="checkbox"
                                    />
                                    <Input
                                        label="Required"
                                        type="checkbox"
                                    />
                                    <Input
                                        label="Mirrorable"
                                        type="checkbox"
                                    />
                                    <Input
                                        label="Presentation Level"
                                    />
                                    <Input
                                        label="Override Level"
                                    />
                                    {/* <Input
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
                                    /> */}
                                </div>
                            )}
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}
