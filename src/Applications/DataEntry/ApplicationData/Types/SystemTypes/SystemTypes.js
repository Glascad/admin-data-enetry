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
                queryStatus,
                queryStatus: {
                    configurationTypes = [],
                    detailTypes = [],
                    allSystemTypes = [],
                    // PresentationLevels = [],
                },
                mutations: {
                    createSystemTypeDetailType,
                    deleteSystemTypeDetailType,
                    createSystemTypeDetailTypeConfigurationType,
                    updateSystemTypeDetailTypeConfigurationType,
                    deleteSystemTypeDetailTypeConfigurationType,
                } = {},
                mutations
            }) => (
                    <div className="card">
                        <ListWrapper
                            title="System Types"
                            items={allSystemTypes.map(system => ({
                                ...system,
                                title: system.type,
                            }))}
                        >
                            {({
                                _systemTypeDetailTypes: systemDetailTypes = [],
                                type: systemType = '',
                            }) => (
                                    <ListWrapper
                                        identifier='title'
                                        titleBar={{
                                            title: "Detail Types",
                                            selections: [systemType],
                                        }}
                                        items={systemDetailTypes.map(detail => ({
                                            ...detail,
                                            title: detail.detailType
                                        }))}
                                        multiSelect={{
                                            allItems: detailTypes.map(dt => ({
                                                title: dt,
                                                arguments: {
                                                    detailType: dt
                                                }
                                            })),
                                        }}
                                        onCreate={({ arguments: { detailType } }) => createSystemTypeDetailType({
                                            systemType,
                                            detailType,
                                        })}
                                        onDelete={({ nodeId }) => deleteSystemTypeDetailType({
                                            nodeId
                                        })}
                                        deleteModal={{
                                            name: "Detail Type"
                                        }}
                                    >
                                        {({
                                            _systemTypeDetailTypeConfigurationTypes: detailConfigurationTypes = [],
                                            detailType = '',
                                        }) => (
                                                <ListWrapper
                                                    identifier='title'
                                                    titleBar={{
                                                        title: "Configuration Types",
                                                        selections: [
                                                            systemType,
                                                            detailType,
                                                        ]
                                                    }}
                                                    items={detailConfigurationTypes.map(configuration => ({
                                                        ...configuration,
                                                        title: configuration.configurationType,
                                                    }))}
                                                    multiSelect={{
                                                        allItems: configurationTypes.map(ct => ({
                                                            title: ct,
                                                            arguments: {
                                                                configurationType: ct
                                                            }
                                                        })),
                                                    }}
                                                    onCreate={({ arguments: { configurationType } }) => createSystemTypeDetailTypeConfigurationType({
                                                        configurationType,
                                                        detailType,
                                                        systemType,
                                                    })}
                                                    onDelete={({ nodeId }) => deleteSystemTypeDetailTypeConfigurationType({
                                                        nodeId
                                                    })}
                                                    deleteModal={{
                                                        name: "Configuration Type"
                                                    }}
                                                >
                                                    {({
                                                        nodeId: systemTypeDetailTypeConfigurationTypeNID = '',
                                                        configurationType: configurationTypeName = '',
                                                        required = false,
                                                        // mirrorable = false,
                                                        // presentationLevel = '',
                                                        // overrideLevel = '',
                                                    }) => (
                                                            <>
                                                                <TitleBar
                                                                    title="Configuration Type Settings"
                                                                    selections={[
                                                                        systemType,
                                                                        detailType,
                                                                        configurationTypeName,
                                                                    ]}
                                                                />
                                                                {/* <Input
                                                                    label="Mirrorable"
                                                                    type="switch"
                                                                    checked={mirrorable}
                                                                    onChange={({ target: { checked } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                        nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                        mirrorable: checked,
                                                                    })}
                                                                /> */}
                                                                <Input
                                                                    label="Required"
                                                                    type="switch"
                                                                    checked={required}
                                                                    onChange={({ target: { checked } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                        nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                        required: checked,
                                                                    })}
                                                                />
                                                                {/* <div
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
                                                                            options: PresentationLevels.map(({ level }) => ({
                                                                                label: level,
                                                                                value: level,
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
                                                                            options: PresentationLevels.map(({ level }) => ({
                                                                                label: level,
                                                                                value: level,
                                                                            })),
                                                                            onChange: ({ value }) => updateSystemTypeDetailTypeConfigurationType({
                                                                                nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                                overrideLevel: value,
                                                                            }),
                                                                        }}
                                                                    />
                                                                </div> */}
                                                            </>
                                                        )}
                                                </ListWrapper>
                                            )}
                                    </ListWrapper>
                                )
                            }
                        </ListWrapper>
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
                            type: systemType = '',
                            _systemTypeDetailTypeConfigurationTypes = [],
                        }) => (
                                <ListWrapper
                                    titleBar={{
                                        title: "Detail Types",
                                        selections: [systemType],
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
                                    })}np
                                    multiSelect={{
                                        allItems: allDetailTypes,
                                    }}
                                    onCreate={({ id }) => createSystemTypeDetailTypeConfigurationType({
                                        detailTypeId: id,
                                    })}
                                    onDelete={({ systemTypeDetailTypeConfigurationTypeNID }) => deleteSystemTypeDetailTypeConfigurationType({
                                        nodeId: systemTypeDetailTypeConfigurationTypeNID
                                    })}
                                >
                                    {({
                                        nodeId: detailTypeNID,
                                        id: detailTypeId,
                                        type: detailType = '',
                                    }) => (
                                            <ListWrapper
                                                titleBar={{
                                                    title: "Configuration Types",
                                                    selections: [
                                                        systemType,
                                                        detailType,
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
                                                                    systemType,
                                                                    detailType,
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
