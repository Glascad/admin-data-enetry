import React, { Component } from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../components';

import {
    presentationLevels,
} from '../../../../../business-logic';

import ACTIONS from '../ducks/actions';

const isNullOrUndefined = item => item === undefined || item === null;

export default class SystemConfigurationOverride extends Component {

    handleChange = (key, value) => {
        const {
            props: {
                _systemConfigurationOverride,
                _detailType: {
                    id: detailTypeId,
                },
                _configurationType: {
                    id: configurationTypeId,
                },
                defaultValues,
                updateSystem,
            },
        } = this;
        const updatedSystemConfigurationOverride = {
            ..._systemConfigurationOverride,
            [key]: value,
        };
        const regex = /Override/;
        const identical = Object.entries(updatedSystemConfigurationOverride)
            .every(([key, value]) => !key.match(regex)
                ||
                typeof value === 'object'
                ||
                isNullOrUndefined(updatedSystemConfigurationOverride[key])
                ||
                updatedSystemConfigurationOverride[key] === defaultValues[key.replace(regex, '')]
            );

        console.log({
            updatedSystemConfigurationOverride,
            identical,
            defaultValues,
        });

        const {
            mirrorableOverride,
            requiredOverride,
            presentationLevelOverride,
            overrideLevelOverride,
        } = updatedSystemConfigurationOverride;

        if (identical) {
            // if the override is identical to the systemtypedetailtypeconfigurationtype
            updateSystem(ACTIONS.OVERRIDE.DELETE, {
                detailTypeId,
                configurationTypeId,
            });
        } else {
            // if we are working with a newly-created override
            updateSystem(ACTIONS.OVERRIDE.UPDATE, {
                detailTypeId,
                configurationTypeId,
                mirrorableOverride,
                requiredOverride,
                presentationLevelOverride,
                overrideLevelOverride,
            });
        }
    }

    render = () => {
        const {
            props: {
                defaultValues: {
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

        console.log(this.props);

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
