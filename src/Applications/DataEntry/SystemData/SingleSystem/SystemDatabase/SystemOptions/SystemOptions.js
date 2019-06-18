import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';

import ACTIONS from '../ducks/actions';

export default function SystemOptions({
    system: {
        _systemOptions = [],
    },
    queryStatus: {
        allConfigurationTypes = [],
    },
    presentationLevels,
    updateSystem,
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            title="System Options"
            items={_systemOptions}
            identifier="id"
            mapPillProps={({
                name,
                id,
            }) => ({
                title: name,
            })}
            onCreate={(_, { input }) => updateSystem(ACTIONS.OPTION.CREATE, {
                name: input,
            })}
            onUpdate={({ arguments: { id } }, { input }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                optionId: id,
                name: input,
            })}
            onDelete={({ arguments: { id } }) => updateSystem(ACTIONS.OPTION.DELETE, {
                optionId: id,
            })}
        >
            {({
                id: optionId,
                name,
                presentationLevel,
                overrideLevel,
                _systemOptionConfigurationTypes = [],
                _optionValues = [],
            }) => (
                    <>
                        <TitleBar
                            title="Option"
                            selections={[name]}
                        />
                        <div className="input-group">
                            <Input
                                label="Presentation Level"
                                value={presentationLevel}
                                select={{
                                    value: {
                                        label: presentationLevel,
                                        value: presentationLevel,
                                    },
                                    options: presentationLevels.map(({ name }) => ({
                                        value: name,
                                        label: name,
                                    })),
                                    onChange: ({ value }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                                        optionId,
                                        presentationLevel: value,
                                    }),
                                }}
                            />
                            <Input
                                label="Override Level"
                                value={overrideLevel}
                                select={{
                                    value: {
                                        label: overrideLevel,
                                        value: overrideLevel,
                                    },
                                    options: presentationLevels.map(({ name }) => ({
                                        value: name,
                                        label: name,
                                    })),
                                    onChange: ({ value }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                                        optionId,
                                        overrideLevel: value,
                                    }),
                                }}
                            />
                        </div>
                        <ListWrapper
                            title="Affected Configuration Types"
                            items={_systemOptionConfigurationTypes
                                .map(({ nodeId, _configurationType }) => ({
                                    systomOptionConfigurationTypeNID: nodeId,
                                    ..._configurationType,
                                }))}
                            mapPillProps={({ type }) => ({
                                title: type
                            })}
                            onFinish={({ addedItems, deletedItems }) => updateSystem(ACTIONS.OPTION.UPDATE_LIST, {
                                optionId,
                                configurationTypeIds: {
                                    addedItems: addedItems.map(({ id }) => id),
                                    deletedItems: deletedItems.map(({ id }) => id),
                                },
                            })}
                            multiSelect={{
                                title: "",
                                allItems: allConfigurationTypes,
                            }}
                        />
                        <ListWrapper
                            title="Values"
                            items={_optionValues}
                            identifier="id"
                            mapPillProps={({ name, id }) => ({
                                title: name,
                            })}
                            onCreate={(_, { input }) => updateSystem(ACTIONS.OPTION.VALUE.CREATE, {
                                optionId,
                                name: input,
                            })}
                            onUpdate={({ arguments: { id } }, { input }) => updateSystem(ACTIONS.OPTION.VALUE.UPDATE, {
                                optionId,
                                valueId: id,
                                name: input,
                            })}
                            onDelete={({ arguments: { id } }) => updateSystem(ACTIONS.OPTION.VALUE.DELETE, {
                                optionId,
                                valueId: id,
                            })}
                        />
                    </>
                )}
        </ListWrapper>
    );
}
