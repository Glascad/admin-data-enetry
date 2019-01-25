import React from 'react';

import {
    GroupingBox,
    Input,
    ListWrapper,
    Toggle,
    TitleBar,
} from '../../../../../components';

import {
    presentationLevels,
} from '../../../../../business-logic';
import StateManager from '../../../../../components/state/StateManager';
import SystemConfigurationOverride from './SystemConfigurationOverride';

export default function ValidTypes({
    queryStatus: {
        system: {
            id: systemId,
            systemType: {
                id: systemTypeId,
                systemTypeDetailTypeConfigurationTypes = [],
            } = {},
            invalidSystemConfigurationTypes = [],
            systemConfigurationOverrides = [],
        } = {},
    },
    mutations: {
        createInvalidSystemConfigurationType,
        deleteInvalidSystemConfigurationType,
        deleteSystemConfigurationOverride,
        updateSystemConfigurationOverride,
        createSystemConfigurationOverride,
    },
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            titleBar={{
                title: "Valid Detail Types"
            }}
            items={systemTypeDetailTypeConfigurationTypes
                //find only the detail types
                .filter(({ configurationType }) => !configurationType)}
            mapPillProps={({
                detailType: {
                    type
                }
            }) => ({
                title: type
            })}
        >
            {({
                detailType: {
                    type: detailTypeName = '',
                    id: detailTypeId,
                } = {}
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Valid Configuration Types",
                            selections: [detailTypeName]
                        }}
                        items={systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailTypeId: id,
                                configurationType,
                                // find only the configuration types
                            }) => configurationType && id === detailTypeId)
                            .map(({
                                configurationTypeId,
                                ...systemTypeDetailTypeConfigurationType
                            }) => {

                                // find if the configuration has been marked invalid in the system
                                const invalidSystemConfigurationType = invalidSystemConfigurationTypes
                                    .find(({
                                        invalidConfigurationTypeId,
                                    }) => invalidConfigurationTypeId === configurationTypeId);

                                const systemConfigurationOverride = systemConfigurationOverrides
                                    .find(({
                                        systemTypeId: stId,
                                        detailTypeId: dtId,
                                        configurationTypeId: ctId,
                                    }) => (
                                            stId === systemTypeId
                                            &&
                                            dtId === detailTypeId
                                            &&
                                            ctId === configurationTypeId
                                        ));

                                return ({
                                    configurationTypeId,
                                    ...systemTypeDetailTypeConfigurationType,
                                    invalidSystemConfigurationType,
                                    systemConfigurationOverride,
                                });
                            })
                            .map(item => { console.log(item); return item; })}
                        mapPillProps={({
                            invalidSystemConfigurationType,
                            configurationType: {
                                type
                            }
                        }) => ({
                            title: type,
                            disabled: !!invalidSystemConfigurationType,
                        })}
                    >
                        {({
                            invalidSystemConfigurationType: {
                                invalid = true,
                                nodeId: invalidSystemConfigurationTypeNID
                            } = {
                                invalid: false,
                            },
                            required,
                            mirrorable,
                            presentationLevel,
                            overrideLevel,
                            configurationType: {
                                id: configurationTypeId,
                                type: configurationTypeName = '',
                            } = {},
                            detailType: {
                                id: detailTypeId,
                                type: detailTypeName = '',
                            } = {},
                            systemConfigurationOverride,
                        }) => (
                                <>
                                    <TitleBar
                                        title="System Configuration Type"
                                        selections={[
                                            detailTypeName,
                                            configurationTypeName,
                                        ]}
                                    />
                                    {/**
                                        This item is dependent on the presence of an entry in the invalidSystemConfigurationTypes table linking the selected system to the selected configuration type.
                                    */}
                                    <Input
                                        label="Invalid"
                                        type="checkbox"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => checked ?
                                            [
                                                createInvalidSystemConfigurationType({
                                                    nodeId: invalidSystemConfigurationTypeNID,
                                                    systemId,
                                                    invalidConfigurationTypeId: configurationTypeId,
                                                }),
                                                deleteSystemConfigurationOverride(systemConfigurationOverride)
                                            ]
                                            :
                                            [
                                                deleteInvalidSystemConfigurationType({
                                                    nodeId: invalidSystemConfigurationTypeNID,
                                                    systemId,
                                                    invalidConfigurationTypeId: configurationTypeId,
                                                }),
                                                createSystemConfigurationOverride(systemConfigurationOverride)
                                            ]}
                                    />
                                    {/* <StateManager
                                        initialState={{
                                            overriding: !!systemConfigurationOverride,
                                        }}
                                    >
                                        {({ state: { overriding }, update }) => ( */}
                                    <div
                                        className={`nested ${invalid ? "disabled" : ""}`}
                                        style={{
                                            marginTop: "1.25rem",
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        {/**
                                            The following items depend upon entries in both the systemTypeDetailTypeConfigurationTypes table and the systemConfigurationOverrides table.
                                            
                                            If there is an entry in the overrides table, it will override whatever value is in the stdtct table, and any changes made will update the overrides table. However, if the changes made to the overrides table make it identical to the stdtct table, the entry will simply be deleted since it is unnecessary.
                                            
                                            If there is no entry in the overrides table, any change will create an entry.
                                        */}
                                        <GroupingBox
                                            title="Default Settings"
                                            className="disabled"
                                            toggle={{
                                                buttons: [
                                                    {
                                                        text: "Override",
                                                        selected: false,
                                                        className: systemConfigurationOverride ?
                                                            "selected"
                                                            :
                                                            "danger",
                                                        onClick: systemConfigurationOverride ?
                                                            () => deleteSystemConfigurationOverride({
                                                                ...systemConfigurationOverride,
                                                                systemId,
                                                                systemTypeId,
                                                                detailTypeId,
                                                                configurationTypeId,
                                                            })
                                                            :
                                                            () => createSystemConfigurationOverride({
                                                                ...systemConfigurationOverride,
                                                                systemId,
                                                                systemTypeId,
                                                                detailTypeId,
                                                                configurationTypeId,
                                                            })
                                                    }
                                                ]
                                            }}
                                        >
                                            <Input
                                                label="Mirrorable"
                                                type="checkbox"
                                                checked={mirrorable}
                                                readOnly={true}
                                            />
                                            <Input
                                                label="Required"
                                                type="checkbox"
                                                checked={required}
                                                readOnly={true}
                                            />
                                            <Input
                                                label="Presentation Level"
                                                type="select"
                                                select={{
                                                    isDisabled: true,
                                                    value: presentationLevels
                                                        .find(({ value }) => value === presentationLevel),
                                                    defaultValue: presentationLevels
                                                        .find(({ value }) => value === presentationLevel),
                                                    options: presentationLevels
                                                }}
                                            />
                                            <Input
                                                label="Override Level"
                                                type="select"
                                                select={{
                                                    isDisabled: true,
                                                    value: presentationLevels
                                                        .find(({ value }) => value === overrideLevel),
                                                    defaultValue: presentationLevels
                                                        .find(({ value }) => value === overrideLevel),
                                                    options: presentationLevels
                                                }}
                                            />
                                        </GroupingBox>
                                        {systemConfigurationOverride ? (
                                            <SystemConfigurationOverride
                                                {...{
                                                    defaultValues: {
                                                        mirrorable,
                                                        required,
                                                        presentationLevel,
                                                        overrideLevel,
                                                    },
                                                    systemConfigurationOverride,
                                                    createSystemConfigurationOverride,
                                                    updateSystemConfigurationOverride,
                                                    deleteSystemConfigurationOverride,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                    {/* )}
                                    </StateManager> */}
                                </>
                            )}
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}
