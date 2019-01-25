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
        const updatedSystemConfigurationOverride = {
            ...this.props.systemConfigurationOverride,
            [key]: value,
        };
        const identical = Object.keys(updatedSystemConfigurationOverride)
            .every(key => {
                const regex = /Override/;
                if (!key.match(regex)) return true;
                else {
                    const updatedValue = updatedSystemConfigurationOverride[key];
                    const previousValue = this.props.defaultValues[key.replace(regex, '')];
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
            defaultValues: this.props.defaultValues,
        });

        // if the override is identical to the systemtypedetailtypeconfigurationtype
        if (identical)
            this.props.deleteSystemConfigurationOverride(updatedSystemConfigurationOverride);

        // if we are working with a newly-created override
        else if (typeof updatedSystemConfigurationOverride.nodeId === 'number')
            this.props.createSystemConfigurationOverride(updatedSystemConfigurationOverride);

        // if we are working with a previously-created override
        else
            this.props.updateSystemConfigurationOverride(updatedSystemConfigurationOverride);
    }

    render = () => {
        const {
            props: {
                systemConfigurationOverride: {
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
                    checked={mirrorableOverride}
                    onChange={({ target: { checked } }) => handleChange("mirrorableOverride", checked)}
                />
                <Input
                    label="Required"
                    type="checkbox"
                    checked={requiredOverride}
                    onChange={({ target: { checked } }) => handleChange("requiredOverride", checked)}
                />
                <Input
                    label="Presentation Level"
                    type="select"
                    select={{
                        value: presentationLevels
                            .find(({ value }) => value === presentationLevelOverride),
                        defaultValue: presentationLevels
                            .find(({ value }) => value === presentationLevelOverride),
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
                            .find(({ value }) => value === overrideLevelOverride),
                        options: presentationLevels,
                        onChange: ({ value }) => handleChange("overrideLevelOverride", value)
                    }}
                />
            </GroupingBox>
        );
    }
}
