import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    HeadedContainer,
} from '../../../../components';

import query from './system-types-graphql/query';
import mutations from './system-types-graphql/mutations';

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
                                    title={`Detail Types - ${systemTypeName}`}
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
                                                title={`Configuration Types - ${
                                                    systemTypeName
                                                    } > ${
                                                    detailTypeName
                                                    }`}
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
                                                            <HeadedContainer
                                                                title={`Configuration Type - ${
                                                                    systemTypeName
                                                                    } > ${
                                                                    detailTypeName
                                                                    } > ${
                                                                    configurationTypeName
                                                                    }`}
                                                            >

                                                            </HeadedContainer>
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
