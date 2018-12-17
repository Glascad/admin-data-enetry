import React from 'react';

import {
    Wizard,
    ApolloListWrapper,
    SelectionWrapper,
    HeadedListContainer,
    Pill,
    Input,
} from '../../../components';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

import { query, mutations } from './system-options-graphql';

export default function ValidTypes({ match: { params: { systemNID } } }) {
    return (
        <Wizard
            mutations={mutations}
            query={{
                query,
                variables: {
                    nodeId: systemNID,
                },
                mapProps: ({
                    data: {
                        system: {
                            systemOptionsBySystemId: {
                                nodes: systemOptions = [],
                            } = {},
                            ...system
                        } = {},
                        allConfigurationTypes: {
                            nodes: allConfigurationTypes = []
                        } = {},
                    }
                }) => ({
                    system,
                    systemOptions,
                    allConfigurationTypes,
                })
            }}
        >
            {({
                queryStatus: {
                    system: {
                        id: systemId,
                    },
                    systemOptions,
                    allConfigurationTypes,
                },
                mutations: {
                    createSystemOption,
                    updateSystemOption,
                    createOptionValue,
                    createSystemOptionConfigurationType,
                },
                batcher: {
                    getNodeId,
                }
            }) => (
                    <ListWrapper3
                        title="Valid Detail Types"
                        items={systemOptions}
                        mapPillProps={({
                            name
                        }) => ({
                            title: name
                        })}
                        onCreate={({ }, { input }) => createSystemOption({
                            systemId,
                            name: input,
                        })}
                    >
                        {({
                            nodeId,
                            id: systemOptionId,
                            name,
                            presentationLevel,
                            overrideLevel,
                            mirrorable,
                            systemOptionConfigurationTypesBySystemOptionId: {
                                nodes: systemOptionConfigurationTypes = []
                            } = {},
                            optionValuesBySystemOptionId: {
                                nodes: optionValues = []
                            } = {},
                        }) => (
                                <>
                                    <Input
                                        label="Option Name"
                                        value={name}
                                        onChange={({ target: { value } }) => updateSystemOption({
                                            nodeId,
                                            name: value
                                        })}
                                    />
                                    <div>
                                        <Input
                                            label="Presentation Level"
                                            value={presentationLevel}
                                            type="select"
                                            select={{
                                                value: {
                                                    label: presentationLevel,
                                                    value: presentationLevel,
                                                },
                                                options: [1, 2, 3, 4].map(n => ({
                                                    value: n,
                                                    label: n,
                                                })),
                                                onChange: ({ value }) => updateSystemOption({
                                                    nodeId,
                                                    presentationLevel: value
                                                })
                                            }}
                                        />
                                        <Input
                                            label="Override Level"
                                            value={overrideLevel}
                                            type="select"
                                            select={{
                                                value: {
                                                    label: overrideLevel,
                                                    value: overrideLevel,
                                                },
                                                options: [1, 2, 3, 4].map(n => ({
                                                    value: n,
                                                    label: n,
                                                })),
                                                onChange: ({ value }) => updateSystemOption({
                                                    nodeId,
                                                    overrideLevel: value
                                                })
                                            }}
                                        />
                                    </div>
                                    <Input
                                        label="Mirrorable"
                                        value={mirrorable}
                                        type="checkbox"
                                    />
                                    <ListWrapper3
                                        title="Affected Configuration Types"
                                        items={systemOptionConfigurationTypes}
                                        mapPillProps={({ configurationTypeByConfigurationTypeId: { type } }) => ({
                                            title: type
                                        })}
                                        onCreate={({ id: configurationTypeId, ...configurationType }) => createSystemOptionConfigurationType({
                                            systemOptionId,
                                            configurationTypeId,
                                        })}
                                        onDelete={item => console.log(item)}
                                        multiSelect={{
                                            title: "",
                                            // initialItems: [],
                                            allItems: allConfigurationTypes
                                                .map(configurationTypeByConfigurationTypeId => ({
                                                    configurationTypeByConfigurationTypeId
                                                })),
                                            mapPillProps: ({ configurationTypeByConfigurationTypeId: { type } }) => ({
                                                title: type
                                            }),
                                        }}
                                    />
                                    <ListWrapper3
                                        title="Values"
                                        items={optionValues}
                                        mapPillProps={({ name }) => ({
                                            title: name
                                        })}
                                        onCreate={({ }, { input }) => createOptionValue({
                                            systemOptionId,
                                            name: input
                                        })}
                                    />
                                </>
                            )}
                    </ListWrapper3>
                )}
        </Wizard>
    );
}
