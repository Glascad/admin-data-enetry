import React from 'react';

import {
    Input,
    ListWrapper,
} from '../../../../../components';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function SystemOptions({
    queryStatus: {
        system: {
            id: systemId,
            _systemOptions = [],
        } = {},
        allConfigurationTypes = [],
    },
    mutations: {
        createSystemOption,
        updateSystemOption,
        deleteSystemOption,
        createSystemOptionConfigurationType,
        deleteSystemOptionConfigurationType,
        createOptionValue,
        deleteOptionValue,
    }
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            title="System Options"
            items={_systemOptions}
            mapPillProps={({
                name
            }) => ({
                title: name
            })}
            onCreate={(_, { input }) => createSystemOption({
                systemId,
                name: input,
            })}
            onUpdate={({ arguments: { nodeId } }, { input }) => updateSystemOption({
                nodeId,
                name: input,
            })}
            onDelete={({ arguments: { nodeId } }) => ({
                nodeId,
            })}
        >
            {({
                nodeId,
                id: systemOptionId,
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
                                    onChange: ({ value }) => updateSystemOption({
                                        nodeId,
                                        presentationLevel: value
                                    })
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
                                    onChange: ({ value }) => updateSystemOption({
                                        nodeId,
                                        overrideLevel: value
                                    })
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
                            onCreate={_configurationType => createSystemOptionConfigurationType({
                                systemOptionId,
                                configurationTypeId: _configurationType.id,
                                _configurationType
                            })}
                            onDelete={({ systomOptionConfigurationTypeNID, ..._configurationType }) => deleteSystemOptionConfigurationType({
                                nodeId: systomOptionConfigurationTypeNID,
                                systemOptionId,
                                configurationTypeId: _configurationType.id,
                                _configurationType,
                            })}
                            multiSelect={{
                                title: "",
                                // initialItems: [],
                                allItems: allConfigurationTypes,
                            }}
                        />
                        <div className="unfinished">
                            <ListWrapper
                                title="Values"
                                items={_optionValues}
                                mapPillProps={({ name }) => ({
                                    title: name
                                })}
                                onCreate={(_, { input }) => createOptionValue({
                                    systemOptionId,
                                    name: input
                                })}
                            />
                        </div>
                    </>
                )}
        </ListWrapper>
    );
}
