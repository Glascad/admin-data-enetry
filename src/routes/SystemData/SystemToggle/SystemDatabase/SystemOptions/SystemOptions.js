import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../components';

import ACTIONS from '../system-manager/system-actions';

export default function SystemOptions({
    system: {
        id: systemId,
        _systemOptions = [],
    },
    queryStatus: {
        allConfigurationTypes = [],
    },
    updateSystem,
    // mutations: {
    //     createSystemOption,
    //     updateSystemOption,
    //     deleteSystemOption,
    //     createSystemOptionConfigurationType,
    //     deleteSystemOptionConfigurationType,
    //     createOptionValue,
    //     deleteOptionValue,
    // }
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
                title: name + ' ' + id,
            })}
            onCreate={(_, { input }) => updateSystem(ACTIONS.OPTION.CREATE, {
                name: input,
            })}
            // onCreate={(_, { input }) => createSystemOption({
            //     systemId,
            //     name: input,
            // })}
            onUpdate={({ arguments: { id } }, { input }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                optionId: id,
                name: input,
            })}
            // onUpdate={({ arguments: { nodeId } }, { input }) => updateSystemOption({
            //     nodeId,
            //     name: input,
            // })}
            onDelete={({ arguments: { id } }) => updateSystem(ACTIONS.OPTION.DELETE, {
                optionId: id,
            })}
        // onDelete={({ arguments: { nodeId } }) => ({
        //     nodeId,
        // })}
        >
            {({
                nodeId,
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
                                    options: [1, 2, 3, 4].map(n => ({
                                        value: n,
                                        label: n,
                                    })),
                                    onChange: ({ value }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                                        optionId,
                                        presentationLevel: value,
                                    }),
                                    // onChange: ({ value }) => updateSystemOption({
                                    //     nodeId,
                                    //     presentationLevel: value
                                    // })
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
                                    options: [1, 2, 3, 4].map(n => ({
                                        value: n,
                                        label: n,
                                    })),
                                    onChange: ({ value }) => updateSystem(ACTIONS.OPTION.UPDATE, {
                                        optionId,
                                        overrideLevel: value,
                                    }),
                                    // onChange: ({ value }) => updateSystemOption({
                                    //     nodeId,
                                    //     overrideLevel: value
                                    // })
                                }}
                            />
                        </div>
                        {/* <Input
                            label="Mirrorable"
                            checked={mirrorable}
                            type="checkbox"
                            onChange={({ target: { checked } }) => updateSystemOption({
                                nodeId,
                                mirrorable: checked
                            })}
                        /> */}
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
                            // onCreate={_configurationType => createSystemOptionConfigurationType({
                            //     optionId,
                            //     configurationTypeId: _configurationType.id,
                            //     _configurationType
                            // })}
                            // onDelete={({ systomOptionConfigurationTypeNID, ..._configurationType }) => deleteSystemOptionConfigurationType({
                            //     nodeId: systomOptionConfigurationTypeNID,
                            //     optionId,
                            //     configurationTypeId: _configurationType.id,
                            //     _configurationType,
                            // })}
                            multiSelect={{
                                title: "",
                                // initialItems: [],
                                allItems: allConfigurationTypes,
                            }}
                        />
                        <ListWrapper
                            title="Values"
                            items={_optionValues}
                            identifier="id"
                            mapPillProps={({ name, id }) => ({
                                title: name + ' ' + id,
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
