import React from 'react';

import ListWrapper3 from '../../../../../components/ApolloListWrapper/ListWrapper3';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
        },
        system,
        systemOptions,
        optionCombinations,
        allConfigurationTypes,
    },
    mutations: {
        createOptionCombination,
        deleteOptionCombination,
        createOptionCombinationOptionValue,
        deleteOptionCombinationOptionValue,
        createOptionCombinationConfigurationType,
        deleteOptionCombinationConfigurationType,
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
                align: "left",
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
            onDelete={({ arguments: { nodeId } }) => deleteOptionCombination({
                nodeId,
            })}
            addButton={{
                type: "large",
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
                id: optionCombinationId,
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
                            items={configurationTypes.map(({ nodeId, configurationTypeByConfigurationTypeId }) => ({
                                optionCombinationConfigurationTypeNID: nodeId,
                                ...configurationTypeByConfigurationTypeId,
                            }))}
                            mapPillProps={({ type }) => ({
                                title: type
                            })}
                            onCreate={configurationType => createOptionCombinationConfigurationType({
                                optionCombinationId,
                                configurationTypeId: configurationType.id,
                                configurationTypeByConfigurationTypeId: configurationType,
                            })}
                            onDelete={({ optionCombinationConfigurationTypeNID, ...configurationType }) => deleteOptionCombinationConfigurationType({
                                optionCombinationId,
                                nodeId: optionCombinationConfigurationTypeNID,
                                configurationTypeId: configurationType.id,
                                configurationTypeByConfigurationTypeId: configurationType,
                            })}
                            multiSelect={{
                                title: "",
                                allItems: allConfigurationTypes
                            }}
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
                            onCreate={optionValue => createOptionCombinationOptionValue({
                                optionCombinationId,
                                optionValueId: optionValue.id,
                                optionValueByOptionValueId: optionValue,
                            })}
                            onDelete={({
                                optionCombinationOptionValueNID,
                                ...optionValue
                            }) => deleteOptionCombinationOptionValue({
                                optionCombinationId,
                                nodeId: optionCombinationOptionValueNID,
                                optionValueId: optionValue.id,
                                optionValueByOptionValueId: optionValue
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
