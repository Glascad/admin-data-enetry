import React from 'react';

import ListWrapper3 from '../../../components/ApolloListWrapper/ListWrapper3';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
        },
        system,
        systemOptions,
        optionCombinations,
    },
    mutations: {
        createOptionCombination
    }
}) {
    return (
        <ListWrapper3
            title="Invalid Combinations"
            items={optionCombinations}
            mapPillProps={({
                optionCombinationConfigurationTypesByOptionCombinationId: {
                    nodes: configurationTypes = [],
                } = {},
                optionCombinationOptionValuesByOptionCombinationId: {
                    nodes: optionValues = [],
                } = {},
            }) => ({
                type: "tile",
                title: !configurationTypes.length && !optionValues.length ?
                    "Empty"
                    : configurationTypes.map(({
                        configurationTypeByConfigurationTypeId: {
                            type
                        }
                    }) => (
                            <span key={type}>{type}</span>
                        )),
                children: optionValues.map(({
                    optionValueByOptionValueId: {
                        systemOptionBySystemOptionId: {
                            name: optionName
                        },
                        name: optionValueName,
                    }
                }) => (
                        <span>{optionName}: {optionValueName}</span>
                    )),
            })}
            addButton={{
                onAdd: () => createOptionCombination({ systemId }),
            }}
        >
            {({
                optionCombinationConfigurationTypesByOptionCombinationId: {
                    nodes: configurationTypes = [],
                } = {},
                optionCombinationOptionValuesByOptionCombinationId: {
                    nodes: optionValues = [],
                } = {},
                ...optionCombination
            }) => (
                    <>
                        {console.log({
                            optionCombination,
                            configurationTypes,
                            optionValues,
                            systemOptions,
                        })}
                        <ListWrapper3
                            title="Configuration Types"
                            items={configurationTypes}
                            mapPillProps={({ }) => ({

                            })}
                        >

                        </ListWrapper3>
                        <ListWrapper3
                            title="Options"
                            items={optionValues.map(({ nodeId, optionValueByOptionValueId }) => ({
                                optionCombinationOptionValueNID: nodeId,
                                ...optionValueByOptionValueId,
                            }))}
                            mapPillProps={({
                                value,
                                name,
                                systemOptionBySystemOptionId: {
                                    name: optionName
                                }
                            }) => ({
                                title: `${optionName}: ${name || value}`
                            })}
                            onCreate={({ }) => console.log({

                            })}
                            onDelete={({ }) => console.log({

                            })}
                            multiSelect={{
                                title: "",
                                allItems: systemOptions.reduce((allItems, {
                                    optionValuesBySystemOptionId: {
                                        nodes: systemOptionValues,
                                    },
                                    ...systemOptionBySystemOptionId
                                }) => ([
                                    ...allItems,
                                    ...systemOptionValues.map(systemOptionValue => ({
                                        ...systemOptionValue,
                                        systemOptionBySystemOptionId
                                    }))
                                ]), []),
                            }}
                        >

                        </ListWrapper3>
                    </>
                )}
        </ListWrapper3>
    );
}
