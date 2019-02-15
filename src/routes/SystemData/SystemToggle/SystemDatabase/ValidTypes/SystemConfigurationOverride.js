import React, { Component } from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../components';

import {
    presentationLevels,
} from '../../../../../business-logic';

const isNullOrUndefined = item => item === undefined || item === null;

export default class SystemConfigurationOverride extends Component {

    handleChange = (key, value) => {
        const {
            props: {
                _systemConfigurationOverride,
                _systemTypeDetailTypeConfigurationType,
            },
        } = this;
        const updatedSystemConfigurationOverride = {
            ..._systemConfigurationOverride,
            [key]: value,
        };
        const identical = Object.entries(updatedSystemConfigurationOverride)
            .every(([key, value]) => {
                const regex = /Override/;
                if (!key.match(regex) || typeof value === 'object') return true;
                else {
                    const updatedValue = updatedSystemConfigurationOverride[key];
                    const previousValue = _systemTypeDetailTypeConfigurationType[key.replace(regex, '')];
                    return (
                        isNullOrUndefined(updatedValue)
                        ||
                        updatedValue === previousValue
                    );
                }
            });

        console.log({
            updatedSystemConfigurationOverride,
            identical,
            _systemTypeDetailTypeConfigurationType: _systemTypeDetailTypeConfigurationType,
        });

        // if the override is identical to the systemtypedetailtypeconfigurationtype
        // if (identical)
        //     deleteSystemConfigurationOverride(updatedSystemConfigurationOverride);

        // // if we are working with a newly-created override
        // else if (typeof updatedSystemConfigurationOverride.nodeId === 'number')
        //     createSystemConfigurationOverride(updatedSystemConfigurationOverride);

        // // if we are working with a previously-created override
        // else
        //     updateSystemConfigurationOverride(updatedSystemConfigurationOverride);
    }

    render = () => {
        const {
            props: {
                _systemTypeDetailTypeConfigurationType: {
                    mirrorable,
                    required,
                    presentationLevel,
                    overrideLevel,
                },
                _systemConfigurationOverride: {
                    mirrorableOverride,
                    requiredOverride,
                    presentationLevelOverride,
                    overrideLevelOverride,
                },
            },
            handleChange,
        } = this;

        return (
            <GroupingBox
                title="Override Settings"
            >
                <Input
                    label="Mirrorable"
                    type="checkbox"
                    checked={mirrorableOverride === undefined ?
                        mirrorable
                        :
                        mirrorableOverride}
                    onChange={({ target: { checked } }) => handleChange("mirrorableOverride", checked)}
                />
                <Input
                    label="Required"
                    type="checkbox"
                    checked={requiredOverride === undefined ?
                        required
                        :
                        requiredOverride}
                    onChange={({ target: { checked } }) => handleChange("requiredOverride", checked)}
                />
                <Input
                    label="Presentation Level"
                    type="select"
                    select={{
                        value: presentationLevels
                            .find(({ value }) => value === presentationLevelOverride),
                        defaultValue: presentationLevels
                            .find(({ value }) => value === presentationLevel),
                        options: presentationLevels,
                        onChange: ({ value }) => handleChange("presentationLevelOverride", value)
                    }}
                />
                <Input
                    label="Override Level"
                    type="select"
                    select={{
                        value: presentationLevels
                            .find(({ value }) => value === overrideLevelOverride),
                        defaultValue: presentationLevels
                            .find(({ value }) => value === overrideLevel),
                        options: presentationLevels,
                        onChange: ({ value }) => handleChange("overrideLevelOverride", value)
                    }}
                />
            </GroupingBox>
        );
    }
}
