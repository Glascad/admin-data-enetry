import React from 'react';

import {
    ListWrapper,
} from '../../../../../components';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
            systemOptions = [],
            optionCombinations = [],
        } = {},
        allConfigurationTypes = [],
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
        <div className="unfinished">
            <ListWrapper
                title="Invalid Combinations"
                items={optionCombinations}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({
                    optionCombinationConfigurationTypes,
                    optionCombinationOptionValues,
                }) => ({
                    title: !optionCombinationConfigurationTypes.length && !optionCombinationOptionValues.length ?
                        "Empty"
                        : optionCombinationConfigurationTypes.map(({
                            configurationType: {
                                type
                            }
                        }) => (
                                <span key={type}>{type}</span>
                            )),
                    children: optionCombinationOptionValues.map(({
                        optionValue: {
                            systemOption: {
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
                    id: optionCombinationId,
                    optionCombinationConfigurationTypes,
                    optionCombinationOptionValues,
                }) => (
                        <>
                            <ListWrapper
                                title="Configuration Types"
                                items={optionCombinationConfigurationTypes.map(({ nodeId, configurationType }) => ({
                                    optionCombinationConfigurationTypeNID: nodeId,
                                    ...configurationType,
                                }))}
                                mapPillProps={({ type }) => ({
                                    title: type
                                })}
                                onCreate={configurationType => createOptionCombinationConfigurationType({
                                    optionCombinationId,
                                    configurationTypeId: configurationType.id,
                                    configurationType,
                                })}
                                onDelete={({ optionCombinationConfigurationTypeNID, ...configurationType }) => deleteOptionCombinationConfigurationType({
                                    optionCombinationId,
                                    nodeId: optionCombinationConfigurationTypeNID,
                                    configurationTypeId: configurationType.id,
                                    configurationType,
                                })}
                                multiSelect={{
                                    title: "",
                                    allItems: allConfigurationTypes
                                }}
                            >

                            </ListWrapper>
                            <ListWrapper
                                title="Options"
                                items={optionCombinationOptionValues.map(({ nodeId, optionValue }) => ({
                                    optionCombinationOptionValueNID: nodeId,
                                    ...optionValue,
                                }))}
                                mapPillProps={({
                                    value,
                                    name,
                                    systemOption: {
                                        name: optionName
                                    }
                                }) => ({
                                    title: `${optionName}: ${name || value}`
                                })}
                                onCreate={optionValue => createOptionCombinationOptionValue({
                                    optionCombinationId,
                                    optionValueId: optionValue.id,
                                    optionValue,
                                })}
                                onDelete={({
                                    optionCombinationOptionValueNID,
                                    ...optionValue
                                }) => deleteOptionCombinationOptionValue({
                                    optionCombinationId,
                                    nodeId: optionCombinationOptionValueNID,
                                    optionValueId: optionValue.id,
                                    optionValue
                                })}
                                multiSelect={{
                                    title: "",
                                    allItems: systemOptions.reduce((allItems, {
                                        optionValues,
                                        ...systemOption
                                    }) => ([
                                        ...allItems,
                                        ...optionValues.map(optionValue => ({
                                            ...optionValue,
                                            systemOption
                                        }))
                                    ]), []),
                                }}
                            >

                            </ListWrapper>
                        </>
                    )}
            </ListWrapper>
        </div>
    );
}
