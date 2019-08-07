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
        systemType: newSystemType,
    } = {},
    queryStatus,
    queryStatus: {
        _system: {
            systemType,
        } = {},
    },
}) => ({
    disabled: newSystemType && newSystemType !== systemType,
    id: "ValidTypes",
});

export default function ValidTypes({
    system: {
        _systemType: {
            type: systemType,
            _systemTypeDetailTypes = [],
        } = {},
        _invalidSystemConfigurationTypes = [],
        _systemConfigurationOverrides = [],
    },
    presentationLevels = [],
    updateSystem,
}) {
    // console.log(arguments[0]);
    // console.log({
    //     systemType,
    //     _systemTypeDetailTypes,
    //     _invalidSystemConfigurationTypes,
    //     _systemConfigurationOverrides,
    // });
    return (
        <ListWrapper
            titleBar={{
                title: "Valid Detail Types"
            }}
            items={_systemTypeDetailTypes.map(stdt => ({
                ...stdt,
                title: stdt.detailType,
            }))}
        >
            {({
                detailType,
                _systemTypeDetailTypeConfigurationTypes = [],
            }) => (
                    <ListWrapper
                        titleBar={{
                            title: "Valid Configuration Types",
                            selections: [detailType]
                        }}
                        // identifier="configurationType"
                        items={_systemTypeDetailTypeConfigurationTypes.map(stdtct => {
                            const {
                                configurationType,
                            } = stdtct;
                            const invalid = _invalidSystemConfigurationTypes.some(ict => (
                                (
                                    ict.detailType === detailType
                                ) && (
                                    ict.invalidConfigurationType === configurationType
                                )
                            ));
                            const override = _systemConfigurationOverrides.find(o => (
                                (
                                    o.detailType === detailType
                                ) && (
                                    o.configurationType === configurationType
                                )
                            ));
                            // console.log({
                            //     ...stdtct,
                            //     invalid,
                            //     override,
                            //     _systemConfigurationOverrides,
                            //     title: configurationType,
                            // })
                            return {
                                ...stdtct,
                                invalid,
                                override,
                                title: configurationType,
                            };
                        })}
                    // items={_systemTypeDetailTypeConfigurationTypes
                    //     .map(({
                    //         // configurationType,
                    //         // _detailType,
                    //         // _configurationType,
                    //         // ...defaultValues
                    //     }) => {

                    //         // find if the configuration has been marked invalid in the system
                    //         // const _invalidSystemConfigurationType = _invalidSystemConfigurationTypes
                    //         //     .find(({
                    //         //         invalidConfigurationType,
                    //         //     }) => invalidConfigurationType === configurationType);

                    //         // const _systemConfigurationOverride = _systemConfigurationOverrides
                    //         //     .find(({
                    //         //         systemType: stId,
                    //         //         detailType: dtId,
                    //         //         configurationType: ctId,
                    //         //     }) => (
                    //         //             stId === systemType
                    //         //             &&
                    //         //             dtId === detailType
                    //         //             &&
                    //         //             ctId === configurationType
                    //         //         ));

                    //         return ({
                    //             configurationType,
                    //             _detailType,
                    //             _configurationType,
                    //             defaultValues,
                    //             // _invalidSystemConfigurationType,
                    //             // _systemConfigurationOverride,
                    //         });
                    //     })}
                    // mapPillProps={({
                    //     _invalidSystemConfigurationType,
                    //     _configurationType: {
                    //         type
                    //     }
                    // }) => ({
                    //     title: type,
                    //     disabled: !!_invalidSystemConfigurationType,
                    // })}
                    >
                        {({
                            invalid,
                            configurationType,
                            detailType,
                            // _invalidSystemConfigurationType: {
                            //     invalid = true,
                            // } = {
                            //     invalid: false,
                            // },
                            required,
                            // defaultValues: {
                            //     required,
                            //     mirrorable,
                            //     presentationLevel,
                            //     overrideLevel,
                            // } = {},
                            // _configurationType,
                            // _configurationType: {
                            //     id: configurationType,
                            //     type: configurationTypeName = '',
                            // } = {},
                            // _detailType,
                            // _detailType: {
                            //     id: detailType,
                            //     type: detailTypeName = '',
                            // } = {},
                            // _systemConfigurationOverride,
                            override,
                            ...ct
                        }) => (
                                <>
                                    {/* {console.log({
                                        invalid,
                                        override,
                                        ...ct,
                                    })} */}
                                    <TitleBar
                                        title="System Configuration Type"
                                        selections={[
                                            detailType,
                                            configurationType,
                                        ]}
                                    />
                                    {/**
                                        This item is dependent on the presence of an entry in the _invalidSystemConfigurationTypes table linking the selected system to the selected configuration type.
                                    */}
                                    <Input
                                        label="Invalid"
                                        type="switch"
                                        checked={invalid}
                                        onChange={({ target: { checked } }) => updateSystem(ACTIONS.LIST, {
                                            invalidSystemConfigurationTypes: {
                                                comparisonKeys: ['detailType', 'invalidConfigurationType'],
                                                [`${checked ? 'add' : 'delet'}edItems`]: [{
                                                    detailType,
                                                    invalidConfigurationType: configurationType,
                                                }],
                                            },
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
                                                override,
                                                required,
                                                detailType,
                                                configurationType,
                                                updateSystem,
                                            }}
                                        />
                                        {override ? (
                                            <SystemConfigurationOverride
                                                {...{
                                                    presentationLevels,
                                                    required,
                                                    detailType,
                                                    configurationType,
                                                    override,
                                                    updateSystem,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </>
                            )
                        }
                    </ListWrapper>
                )}
        </ListWrapper>
    );
}
