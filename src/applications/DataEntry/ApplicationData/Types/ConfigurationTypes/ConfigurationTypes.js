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
                queryStatus: {
                    allConfigurationTypes = [],
                    // allManufacturers = [],
                    allPartTypes = [],
                },
                mutations: {
                    createConfigurationType,
                    updateConfigurationType,
                    deleteConfigurationType,
                    createConfigurationTypePartType,
                    deleteConfigurationTypePartType,
                    // createConfigurationNameOverride,
                    // updateConfigurationNameOverride,
                    // deleteConfigurationNameOverride,
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
                            // presentationLevel,
                            // overrideLevel,
                            _configurationTypePartTypes = [],
                            // configurationNameOverrides = [],
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
                                    {/* <Input
                                        label="Presentation Level"
                                        type="number"
                                        initialValue={presentationLevel || 0}
                                        onBlur={({ target: { value } }) => updateConfigurationType({
                                            nodeId,
                                            presentationLevel: value,
                                        })}
                                    /> */}
                                    {/* <Input
                                        label="Override Level"
                                        type="number"
                                        initialValue={overrideLevel || 0}
                                        onBlur={({ target: { value } }) => updateConfigurationType({
                                            nodeId,
                                            overrideLevel: value,
                                        })}
                                    /> */}
                                    <ListWrapper
                                        label="Part Types"
                                        // titleBar={{
                                        //     title: "Part Types",
                                        //     selections: [type]
                                        // }}
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
                                    {/* <div className="unfinished">
                                        <ListWrapper
                                            titleBar={{
                                                title: "Name Overrides",
                                                selection: [type],
                                            }}
                                            items={configurationNameOverrides}
                                            mapPillProps={() => ({})}
                                        />
                                    </div> */}
                                </>
                            )
                        }
                    </ListWrapper >
                )}
        </ApolloWrapper >
    );
}
