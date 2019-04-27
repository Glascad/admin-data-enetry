import React, { PureComponent } from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

import ACTIONS from '../ducks/actions';

const isNullOrUndefined = item => item === undefined || item === null;

export default class SystemConfigurationOverride extends PureComponent {

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
                presentationLevels,
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
                    type="switch"
                    checked={mirrorableOverride === undefined ?
                        mirrorable
                        :
                        mirrorableOverride}
                    onChange={({ target: { checked } }) => handleChange("mirrorableOverride", checked)}
                />
                <Input
                    label="Required"
                    type="switch"
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
                            .find(({ name }) => name === presentationLevelOverride),
                        defaultValue: presentationLevels
                            .find(({ name }) => name === presentationLevel),
                        options: presentationLevels,
                        onChange: ({ name }) => handleChange("presentationLevelOverride", name)
                    }}
                />
                <Input
                    label="Override Level"
                    type="select"
                    select={{
                        value: presentationLevels
                            .find(({ name }) => name === overrideLevelOverride),
                        defaultValue: presentationLevels
                            .find(({ name }) => name === overrideLevel),
                        options: presentationLevels,
                        onChange: ({ name }) => handleChange("overrideLevelOverride", name)
                    }}
                />
            </GroupingBox>
        );
    }
}
