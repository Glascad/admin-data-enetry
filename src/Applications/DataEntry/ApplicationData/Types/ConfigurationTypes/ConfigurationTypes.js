import React from 'react';

import {
    ApolloWrapper,
    ListWrapper,
    Input,
} from '../../../../../components';

import query from './configuration-types-graphql/query';
import mutations from './configuration-types-graphql/mutations';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function ConfigurationTypes() {
    return (
        <ApolloWrapper
            query={query}
            mutations={mutations}
        >
            {({
                queryResult: {
                    allConfigurationTypes = [],
                    allPartTypes = [],
                },
                mutations: {
                    createConfigurationType,
                    updateConfigurationType,
                    deleteConfigurationType,
                    createConfigurationTypePartType,
                    deleteConfigurationTypePartType,
                },
            }) => (
                    <ListWrapper
                        title="Configuration Types"
                        items={allConfigurationTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={(_, { input }) => createConfigurationType({
                            type: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateConfigurationType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteConfigurationType({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Configuration Type"
                        }}
                    >
                        {({
                            nodeId,
                            id: configurationTypeId,
                            type,
                            door,
                            _configurationTypePartTypes = [],
                        }) => (
                                <>
                                    <TitleBar
                                        title="Configuration Type Settings"
                                        selections={[type]}
                                    />
                                    <Input
                                        label="Door"
                                        type="switch"
                                        checked={door}
                                        onChange={({ target: { checked } }) => updateConfigurationType({
                                            nodeId,
                                            door: checked,
                                        })}
                                    />
                                    <ListWrapper
                                        label="Part Types"
                                        items={_configurationTypePartTypes
                                            .map(({
                                                nodeId,
                                                _partType,
                                            }) => ({
                                                configurationTypePartTypeNID: nodeId,
                                                ..._partType
                                            }))}
                                        multiSelect={{
                                            allItems: allPartTypes,
                                        }}
                                        mapPillProps={({ type }) => ({
                                            title: type
                                        })}
                                        onCreate={({ id }) => createConfigurationTypePartType({
                                            configurationTypeId,
                                            partTypeId: id,
                                        })}
                                        onDelete={({ configurationTypePartTypeNID }) => deleteConfigurationTypePartType({
                                            nodeId: configurationTypePartTypeNID
                                        })}
                                        deleteModal={{
                                            name: `${type} Part Type`
                                        }}
                                    />
                                </>
                            )
                        }
                    </ListWrapper >
                )}
        </ApolloWrapper >
    );
}
