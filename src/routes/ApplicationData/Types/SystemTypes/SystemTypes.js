import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    Input,
} from '../../../../components';

import query from './system-types-graphql/query';
import mutations from './system-types-graphql/mutations';
import TitleBar from '../../../../components/ui/TitleBar/TitleBar';

export default function SystemTypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryStatus: {
                    allSystemTypes = [],
                    allDetailTypes = [],
                    allConfigurationTypes = [],
                },
                mutations: {
                    createSystemType,
                    updateSystemType,
                    deleteSystemType,
                    // createSystemTypeDetailType,
                    // deleteSystemTypeDetailType,
                    createSystemTypeDetailTypeConfigurationType,
                    updateSystemTypeDetailTypeConfigurationType,
                    deleteSystemTypeDetailTypeConfigurationType,
                },
            }) => (
                    <ListWrapper
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
                            systemTypeDetailTypeConfigurationTypes = [],
                        }) => (
                                <ListWrapper
                                    titleBar={{
                                        title: "Detail Types",
                                        selections: [systemTypeName],
                                    }}
                                    items={systemTypeDetailTypeConfigurationTypes
                                        .filter(({
                                            configurationType,
                                        }) => !configurationType)
                                        .map(({
                                            nodeId,
                                            detailType,
                                        }) => ({
                                            systemTypeDetailTypeConfigurationTypeNID: nodeId,
                                            ...detailType,
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
                                                items={systemTypeDetailTypeConfigurationTypes
                                                    .filter(({
                                                        detailType: {
                                                            nodeId
                                                        },
                                                        configurationType,
                                                    }) => configurationType && nodeId === detailTypeNID)
                                                    .map(({
                                                        nodeId,
                                                        configurationType,
                                                        mirrorable,
                                                        required,
                                                        presentationLevel,
                                                        overrideLevel,
                                                    }) => ({
                                                        systemTypeDetailTypeConfigurationTypeNID: nodeId,
                                                        ...configurationType,
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
                                                                type="checkbox"
                                                                checked={mirrorable}
                                                                onChange={({ target: { checked } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                    nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                    mirrorable: checked,
                                                                })}
                                                            />
                                                            <Input
                                                                label="Required"
                                                                type="checkbox"
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
                                                                    type="number"
                                                                    initialValue={presentationLevel}
                                                                    onBlur={({ target: { value } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                        nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                        presentationLevel: value,
                                                                    })}
                                                                />
                                                                <Input
                                                                    label="Override Level"
                                                                    type="number"
                                                                    initialValue={overrideLevel}
                                                                    onBlur={({ target: { value } }) => updateSystemTypeDetailTypeConfigurationType({
                                                                        nodeId: systemTypeDetailTypeConfigurationTypeNID,
                                                                        overrideLevel: value,
                                                                    })}
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
            }
        </ApolloWrapper >
    );
}
