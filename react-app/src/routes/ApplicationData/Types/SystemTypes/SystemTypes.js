import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    HeadedContainer,
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
                    createSystemTypeDetailType,
                    deleteSystemTypeDetailType,
                    createSystemTypeDetailTypeConfigurationType,
                    deleteSystemTypeDetailTypeConfigurationType,
                },
            }) => (
                    <ListWrapper
                        title="System Types"
                        items={allSystemTypes}
                        mapPillProps={({ type }) => ({
                            title: type,
                        })}
                        onCreate={({ }, { input }) => createSystemType({
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
                            systemTypeDetailTypes = [],
                            systemTypeDetailTypeConfigurationTypes = [],
                        }) => (
                                <ListWrapper
                                    titleBar={{
                                        title: "Detail Types",
                                        selections: [systemTypeName],
                                    }}
                                    items={systemTypeDetailTypes
                                        .map(({
                                            nodeId,
                                            detailType,
                                        }) => ({
                                            systemTypeDetailTypeNID: nodeId,
                                            ...detailType,
                                        }))}
                                    mapPillProps={({ type }) => ({
                                        title: type,
                                    })}
                                    multiSelect={{
                                        allItems: allDetailTypes,
                                    }}
                                    onCreate={({ id }) => createSystemTypeDetailType({
                                        systemTypeId,
                                        detailTypeId: id,
                                    })}
                                    onDelete={({ systemTypeDetailTypeNID }) => deleteSystemTypeDetailType({
                                        nodeId: systemTypeDetailTypeNID
                                    })}
                                >
                                    {({
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
                                                    .map(({
                                                        nodeId,
                                                        configurationType,
                                                    }) => ({
                                                        systemTypeDetailTypeConfigurationTypeNID: nodeId,
                                                        ...configurationType,
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
                                                    type: configurationTypeName = '',
                                                }) => (
                                                        <div className="unfinished">
                                                            <TitleBar
                                                                title="Configuration Type"
                                                                selections={[
                                                                    systemTypeName,
                                                                    detailTypeName,
                                                                    configurationTypeName,
                                                                ]}
                                                            />
                                                        </div>
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
