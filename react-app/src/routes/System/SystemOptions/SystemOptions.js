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
                queryStatus,
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
                    deleteSystemOptionConfigurationType,
                },
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
                                    {console.log(queryStatus)}
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
                                        items={systemOptionConfigurationTypes
                                            .map(({ nodeId, configurationTypeByConfigurationTypeId }) => ({
                                                systomOptionConfigurationTypeNID: nodeId,
                                                ...configurationTypeByConfigurationTypeId,
                                            }))}
                                        mapPillProps={({ type }) => ({
                                            title: type
                                        })}
                                        onCreate={configurationType => createSystemOptionConfigurationType({
                                            n: console.log(configurationType),
                                            systemOptionId,
                                            configurationTypeId: configurationType.id,
                                            configurationTypeByConfigurationTypeId: configurationType
                                        })}
                                        onDelete={({ systomOptionConfigurationTypeNID, ...configurationType }) => deleteSystemOptionConfigurationType({
                                            n: console.log(configurationType),
                                            nodeId: systomOptionConfigurationTypeNID,
                                            systemOptionId,
                                            configurationTypeId: configurationType.id,
                                            configurationTypeByConfigurationTypeId: configurationType,
                                        })}
                                        multiSelect={{
                                            title: "",
                                            // initialItems: [],
                                            allItems: allConfigurationTypes,
                                            mapPillProps: ({ type }) => ({
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
