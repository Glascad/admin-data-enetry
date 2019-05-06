import React from 'react';

import {
    Input,
    ListWrapper,
    TitleBar,
} from '../../../../../../components';

import SystemTypeDetailTypeConfigurationType from './SystemTypeDetailTypeConfigurationType';
import SystemConfigurationOverride from './SystemConfigurationOverride';

import ACTIONS from '../ducks/actions';

import './ValidTypes.scss';

ValidTypes.navigationOptions = ({
    system: {
        systemTypeId: newSystemTypeId,
    } = {},
    queryStatus: {
        _system: {
            systemTypeId,
        } = {},
    },
}) => ({
    disabled: newSystemTypeId && newSystemTypeId !== systemTypeId,
    id: "ValidTypes",
});

export default function ValidTypes({
    system: {
        _systemType: {
            id: systemTypeId,
            _systemTypeDetailTypeConfigurationTypes = [],
        } = {},
        _invalidSystemConfigurationTypes = [],
        _systemConfigurationOverrides = [],
    },
    presentationLevels,
    updateSystem,
}) {
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
                        identifier="configurationTypeId"
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
                                ...defaultValues
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
                                    defaultValues,
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
                            defaultValues,
                            defaultValues: {
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
                                        type="switch"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => updateSystem(ACTIONS.UPDATE_LIST, {
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
                                        <SystemTypeDetailTypeConfigurationType
                                            {...{
                                                presentationLevels,
                                                _systemConfigurationOverride,
                                                defaultValues,
                                                _detailType,
                                                _configurationType,
                                                updateSystem,
                                            }}
                                        />
                                        {_systemConfigurationOverride ? (
                                            <SystemConfigurationOverride
                                                {...{
                                                    presentationLevels,
                                                    defaultValues,
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
