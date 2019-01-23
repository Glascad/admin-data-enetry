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
    console.log(arguments[0]);
    return (
        <ListWrapper
            titleBar={{
                title: "Valid Detail Types"
            }}
            items={systemTypeDetailTypeConfigurationTypes
                .filter(({ configurationType }) => !configurationType)}
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
                                },
                                configurationType,
                            }) => configurationType && nodeId === detailTypeNID)
                            .map(({
                                nodeId: configurationTypeNID,
                                ...systemTypeDetailTypeConfigurationType
                            }) => {
                                const {
                                    nodeId: invalidSystemConfigurationTypeNID
                                } = invalidSystemConfigurationTypes
                                    .find(({
                                        configurationType: {
                                            nodeId: invalidNID,
                                        }
                                    }) => invalidNID === configurationTypeNID)
                                    ||
                                    {};

                                return {
                                    nodeId: configurationTypeNID,
                                    ...systemTypeDetailTypeConfigurationType,
                                    invalid: !!invalidSystemConfigurationTypeNID,
                                    invalidSystemConfigurationTypeNID,
                                };
                            })}
                        mapPillProps={({
                            invalid,
                            configurationType: {
                                type
                            }
                        }) => ({
                            title: type,
                            disabled: invalid,
                        })}
                    >
                        {({
                            configurationTypeId,
                            invalid,
                            invalidSystemConfigurationTypeNID,
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
                                    {console.log({
                                        invalid,
                                        invalidSystemConfigurationTypeNID,
                                        required,
                                        mirrorable,
                                        configurationType: {
                                            type: configurationTypeName,
                                        } = {},
                                        ...data
                                    })}
                                    <Input
                                        label="Invalid"
                                        type="checkbox"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => checked ?
                                            createInvalidSystemConfigurationType({
                                                nodeId: invalidSystemConfigurationTypeNID,
                                                systemId,
                                                invalidConfigurationTypeId: configurationTypeId,
                                            })
                                            :
                                            deleteInvalidSystemConfigurationType({
                                                nodeId: invalidSystemConfigurationTypeNID,
                                                systemId,
                                                invalidConfigurationTypeId: configurationTypeId,
                                            })}
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
