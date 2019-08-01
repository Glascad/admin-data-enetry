import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    Input,
} from '../../../../../components';

import query from './system-types-graphql/query';
import mutations from './system-types-graphql/mutations';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

SystemTypes.navigationOptions = {
    name: "System Types",
};

export default function SystemTypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({

            }) => (
                    <div className="card">
                        {/* <ListWrapper>
                            {({

                            }) => (
                                    <ListWrapper>
                                        {({

                                        }) => (
                                                <ListWrapper>
                                                    <div>

                                                    </div>
                                                </ListWrapper>
                                            )}
                                    </ListWrapper>
                                )}
                        </ListWrapper> */}
                    </div>
                )}
            {/* {({
                queryStatus: {
                    allSystemTypes = [],
                    allDetailTypes = [],
                    allConfigurationTypes = [],
                    PresentationLevels: {
                        enumValues: presentationLevels = [],
                    } = {},
                },
                mutations: {
                    createSystemType,
                    updateSystemType,
                    deleteSystemType,
                    createSystemTypeDetailTypeConfigurationType,
                    updateSystemTypeDetailTypeConfigurationType,
                    deleteSystemTypeDetailTypeConfigurationType,
                },
                queryStatus,
                mutations,
                rawQueryStatus,
                rawQueryStatus: {
                    error: {
                        networkError: {
                            result: {
                                errors = [],
                            } = {},
                        } = {},
                    } = {},
                },
            }) => (
                    <ListWrapper
                        // n={console.log({ queryStatus, mutations, rawQueryStatus })}
                        // n={console.log(errors.map(({ message }) => message))}
                        // n={errors.forEach(({ message }) => console.log(message))}
                        // n={errors.forEach(({ message }) => console.log(message.replace(/^cannot query field "(\w+)" on type "(\w+)".*$/i, '$1 - $2')))}
                        title="System Types"
                        items={allSystemTypes}
                        mapPillProps={({ type }) => ({
                            title: type,
                        })}
                        onCreate={(_, { input }) => createSystemType({
                            type: input,
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateSystemType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteSystemType({
                            nodeId,
                        })}
                    >
                        {({
                            id: systemTypeId,
                            type: systemTypeName = '',
                            _systemTypeDetailTypeConfigurationTypes = [],
                        }) => (
                                <ListWrapper
                                    titleBar={{
                                        title: "Detail Types",
                                        selections: [systemTypeName],
                                    }}
                                    items={_systemTypeDetailTypeConfigurationTypes
                                        .filter(({
                                            _configurationType: {
                                                id,
                                            },
                                        }) => !id)
                                        .map(({
                                            nodeId,
                                            _detailType,
                                        }) => ({
                                            systemTypeDetailTypeConfigurationTypeNID: nodeId,
                                            ..._detailType,
                                        }))}
                                    mapPillProps={({ type }) => ({
                                        title: type,
                                    })}
                                    multiSelect={{
                                        allItems: allDetailTypes,
                                    }}
                                    onCreate={({ id }) => createSystemTypeDetailTypeConfigurationType({
                                        systemTypeId,
                                        detailTypeId: id,
                                    })}
                                    onDelete={({ systemTypeDetailTypeConfigurationTypeNID }) => deleteSystemTypeDetailTypeConfigurationType({
                                        nodeId: systemTypeDetailTypeConfigurationTypeNID
                                    })}
                                >
                                    {({
                                        nodeId: detailTypeNID,
                                        id: detailTypeId,
                                        type: detailTypeName = '',
                                    }) => (
                                            <ListWrapper
                                                titleBar={{
                                                    title: "Configuration Types",
                                                    selections: [
                                                        systemTypeName,
                                                        detailTypeName,
                                                    ]
                                                }}
                                                items={_systemTypeDetailTypeConfigurationTypes
                                                    .filter(({
                                                        _detailType: {
                                                            nodeId
                                                        },
                                                        _configurationType: {
                                                            id,
                                                        },
                                                    }) => id && nodeId === detailTypeNID)
                                                    .map(({
                                                        nodeId,
                                                        _configurationType,
                                                        mirrorable,
                                                        required,
                                                        presentationLevel,
                                                        overrideLevel,
                                                    }) => ({
                                                        systemTypeDetailTypeConfigurationTypeNID: nodeId,
                                                        ..._configurationType,
                                                        mirrorable,
                                                        required,
                                                        presentationLevel,
                                                        overrideLevel,
                                                    }))}
                                                mapPillProps={({ type }) => ({
                                                    title: type
                                                })}
                                                multiSelect={{
                                                    allItems: allConfigurationTypes,
                                                }}
                                                onCreate={({ id }) => createSystemTypeDetailTypeConfigurationType({
                                                    systemTypeId,
                                                    detailTypeId,
                                                    configurationTypeId: id,
                                                })}
                                                onDelete={({ systemTypeDetailTypeConfigurationTypeNID }) => deleteSystemTypeDetailTypeConfigurationType({
                                                    nodeId: systemTypeDetailTypeConfigurationTypeNID
                                                })}
                                            >
                                                {({
                                                    systemTypeDetailTypeConfigurationTypeNID,
                                                    type: configurationTypeName = '',
                                                    mirrorable,
                                                    required,
                                                    presentationLevel,
                                                    overrideLevel,
                                                }) => (
                                                        <>
                                                            <TitleBar
                                                                title="Configuration Type Settings"
                                                                selections={[
                                                                    systemTypeName,
                                                                    detailTypeName,
                                                                    configurationTypeName,
                                                                ]}
                                                            />
                                                            <Input
                                                                label="Mirrorable"
                                                                type="switch"
                                                                checked={mirrorable}
                                                                onChange={({ target: { checked } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                    nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                    mirrorable: checked,
                                                                })}
                                                            />
                                                            <Input
                                                                label="Required"
                                                                type="switch"
                                                                checked={required}
                                                                onChange={({ target: { checked } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                    nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                    required: checked,
                                                                })}
                                                            />
                                                            <div
                                                                className={`nested ${
                                                                    required ?
                                                                        "disabled"
                                                                        :
                                                                        ""
                                                                    }`}
                                                                style={{ marginTop: "1.25rem" }}
                                                            >
                                                                <Input
                                                                    label="Presentation Level"
                                                                    select={{
                                                                        value: {
                                                                            label: presentationLevel,
                                                                            value: presentationLevel,
                                                                        },
                                                                        options: presentationLevels.map(({ name }) => ({
                                                                            label: name,
                                                                            value: name,
                                                                        })),
                                                                        onChange: ({ value }) => updateSystemTypeDetailTypeConfigurationType({
                                                                            nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                            presentationLevel: value,
                                                                        }),
                                                                    }}
                                                                />
                                                                <Input
                                                                    label="Override Level"
                                                                    select={{
                                                                        value: {
                                                                            label: overrideLevel,
                                                                            value: overrideLevel,
                                                                        },
                                                                        options: presentationLevels.map(({ name }) => ({
                                                                            label: name,
                                                                            value: name,
                                                                        })),
                                                                        onChange: ({ value }) => updateSystemTypeDetailTypeConfigurationType({
                                                                            nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                            overrideLevel: value,
                                                                        }),
                                                                    }}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                            </ListWrapper>
                                        )}
                                </ListWrapper>
                            )}
                    </ListWrapper>
                )
            } */}
        </ApolloWrapper >
    );
}
