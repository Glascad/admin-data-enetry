import React from 'react';

import {
    GroupingBox,
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../components';

import {
    presentationLevels,
} from '../../../../../business-logic';

import SystemConfigurationOverride from './SystemConfigurationOverride';

import {
    UPDATE_SYSTEM_LIST,
    CREATE_CONFIGURATION_OVERRIDE,
    UPDATE_CONFIGURATION_OVERRIDE,
    DELETE_CONFIGURATION_OVERRIDE,
} from '../system-manager/system-actions';

ValidTypes.navigationOptions = ({
    system: {
        systemTypeId: newSystemTypeId,
    } = {},
    queryStatus,
    queryStatus: {
        system: {
            systemTypeId,
        } = {},
    },
}) => ({
    disabled: newSystemTypeId && newSystemTypeId !== systemTypeId,
});

export default function ValidTypes({
    system: {
        _systemType: {
            id: systemTypeId,
            _systemTypeDetailTypeConfigurationTypes = [],
        } = {},
        _invalidSystemConfigurationTypes = [],
        _systemConfigurationOverrides = [],
    } = {},
    updateSystem,
}) {
    console.log(arguments[0]);
    return (
        <ListWrapper
            titleBar={{
                title: "Valid Detail Types"
            }}
            items={_systemTypeDetailTypeConfigurationTypes
                //find only the detail types
                .filter(({ _configurationType: { id } }) => !id)}
            mapPillProps={({
                _detailType: {
                    type
                }
            }) => ({
                title: type
            })}
        >
            {({
                _detailType: {
                    type: detailTypeName = '',
                    id: detailTypeId,
                } = {}
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Valid Configuration Types",
                            selections: [detailTypeName]
                        }}
                        items={_systemTypeDetailTypeConfigurationTypes
                            .filter(({
                                detailTypeId: id,
                                _configurationType: {
                                    id: configurationTypeId
                                },
                                // find only the configuration types
                            }) => configurationTypeId && id === detailTypeId)
                            .map(({
                                configurationTypeId,
                                _detailType,
                                _configurationType,
                                ..._systemTypeDetailTypeConfigurationType
                            }) => {

                                // find if the configuration has been marked invalid in the system
                                const _invalidSystemConfigurationType = _invalidSystemConfigurationTypes
                                    .find(({
                                        invalidConfigurationTypeId,
                                    }) => invalidConfigurationTypeId === configurationTypeId);

                                const _systemConfigurationOverride = _systemConfigurationOverrides
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
                                    _detailType,
                                    _configurationType,
                                    _systemTypeDetailTypeConfigurationType,
                                    _invalidSystemConfigurationType,
                                    _systemConfigurationOverride,
                                });
                            })}
                        mapPillProps={({
                            _invalidSystemConfigurationType,
                            _configurationType: {
                                type
                            }
                        }) => ({
                            title: type,
                            disabled: !!_invalidSystemConfigurationType,
                        })}
                    >
                        {({
                            _invalidSystemConfigurationType: {
                                invalid = true,
                            } = {
                                invalid: false,
                            },
                            _systemTypeDetailTypeConfigurationType,
                            _systemTypeDetailTypeConfigurationType: {
                                required,
                                mirrorable,
                                presentationLevel,
                                overrideLevel,
                            } = {},
                            _configurationType,
                            _configurationType: {
                                id: configurationTypeId,
                                type: configurationTypeName = '',
                            } = {},
                            _detailType,
                            _detailType: {
                                id: detailTypeId,
                                type: detailTypeName = '',
                            } = {},
                            _systemConfigurationOverride,
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
                                        This item is dependent on the presence of an entry in the _invalidSystemConfigurationTypes table linking the selected system to the selected configuration type.
                                    */}
                                    <Input
                                        label="Invalid"
                                        type="checkbox"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => updateSystem(UPDATE_SYSTEM_LIST, {
                                            invalidConfigurationTypeIds: {
                                                addedItems: checked ? [configurationTypeId] : [],
                                                deletedItems: checked ? [] : [configurationTypeId],
                                            }
                                        })}
                                    />
                                    <div
                                        className={`nested ${invalid ? "disabled" : ""}`}
                                        style={{
                                            marginTop: "1.25rem",
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        {/**
                                            The following items depend upon entries in both the _systemTypeDetailTypeConfigurationTypes table and the _systemConfigurationOverrides table.
                                            
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
                                                        className: _systemConfigurationOverride ?
                                                            "selected"
                                                            :
                                                            "danger",
                                                        onClick: () => updateSystem(_systemConfigurationOverride ?
                                                            DELETE_CONFIGURATION_OVERRIDE
                                                            :
                                                            CREATE_CONFIGURATION_OVERRIDE, {
                                                                detailTypeId,
                                                                configurationTypeId,
                                                            }),
                                                    },
                                                ],
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
                                                    options: presentationLevels,
                                                }}
                                            />
                                        </GroupingBox>
                                        {_systemConfigurationOverride ? (
                                            <SystemConfigurationOverride
                                                {...{
                                                    _systemTypeDetailTypeConfigurationType,
                                                    _detailType,
                                                    _configurationType,
                                                    _systemConfigurationOverride,
                                                    updateSystem,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </>
                            )}
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}
