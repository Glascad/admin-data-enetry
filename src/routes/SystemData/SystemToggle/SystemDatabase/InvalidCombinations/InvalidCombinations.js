import React from 'react';

import {
    ListWrapper,
} from '../../../../../components';

export default function InvalidCombinations({
    queryStatus: {
        system: {
            id: systemId,
            _systemOptions = [],
            _optionCombinations = [],
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
    console.log(arguments[0]);
    return (
        <div className="unfinished">
            <ListWrapper
                title="Invalid Combinations"
                items={_optionCombinations}
                defaultPillProps={{
                    type: "tile",
                    align: "left",
                }}
                mapPillProps={({
                    _optionCombinationConfigurationTypes,
                    _optionCombinationOptionValues,
                }) => ({
                    title: !_optionCombinationConfigurationTypes.length && !_optionCombinationOptionValues.length ?
                        "Empty"
                        : _optionCombinationConfigurationTypes.map(({
                            _configurationType: {
                                type
                            }
                        }) => (
                                <span key={type}>{type}</span>
                            )),
                    children: _optionCombinationOptionValues.map(({
                        _optionValue: {
                            _systemOption: {
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
                    _optionCombinationConfigurationTypes = [],
                    _optionCombinationOptionValues = [],
                }) => (
                        <>
                            <ListWrapper
                                title="Configuration Types"
                                items={_optionCombinationConfigurationTypes.map(({ nodeId, _configurationType }) => ({
                                    optionCombinationConfigurationTypeNID: nodeId,
                                    ..._configurationType,
                                }))}
                                mapPillProps={({ type }) => ({
                                    title: type
                                })}
                                onCreate={_configurationType => createOptionCombinationConfigurationType({
                                    optionCombinationId,
                                    configurationTypeId: _configurationType.id,
                                    _configurationType,
                                })}
                                onDelete={({ optionCombinationConfigurationTypeNID, ..._configurationType }) => deleteOptionCombinationConfigurationType({
                                    optionCombinationId,
                                    nodeId: optionCombinationConfigurationTypeNID,
                                    configurationTypeId: _configurationType.id,
                                    _configurationType,
                                })}
                                multiSelect={{
                                    title: "",
                                    allItems: allConfigurationTypes
                                }}
                            >

                            </ListWrapper>
                            <ListWrapper
                                title="Options"
                                items={_optionCombinationOptionValues.map(({ nodeId, optionValue }) => ({
                                    optionCombinationOptionValueNID: nodeId,
                                    ...optionValue,
                                }))}
                                mapPillProps={({
                                    value,
                                    name,
                                    _systemOption: {
                                        name: optionName
                                    }
                                }) => ({
                                    title: `${optionName}: ${name || value}`
                                })}
                                onCreate={_optionValue => createOptionCombinationOptionValue({
                                    optionCombinationId,
                                    optionValueId: _optionValue.id,
                                    _optionValue,
                                })}
                                onDelete={({
                                    optionCombinationOptionValueNID,
                                    ..._optionValue
                                }) => deleteOptionCombinationOptionValue({
                                    optionCombinationId,
                                    nodeId: optionCombinationOptionValueNID,
                                    optionValueId: _optionValue.id,
                                    _optionValue,
                                })}
                                multiSelect={{
                                    title: "",
                                    allItems: _systemOptions.reduce((allItems, {
                                        optionValues,
                                        ..._systemOption
                                    }) => ([
                                        ...allItems,
                                        ...optionValues.map(optionValue => ({
                                            ...optionValue,
                                            _systemOption
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
