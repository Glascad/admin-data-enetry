import React from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

import ACTIONS from '../ducks/actions';

const isNullOrUndefined = item => item === undefined || item === null;

export default function SystemConfigurationOverride({
    presentationLevels,
    defaultValues,
    required,
    // mirrorable,
    // presentationLevel,
    // overrideLevel,
    detailType,
    configurationType,
    override,
    override: {
        requiredOverride,
        // mirrorableOverride,
        // presentationLevelOverride,
        // overrideLevelOverride,
    } = {},
    updateSystem,
}) {
    const handleChange = (key, value) => {
        const updatedSystemConfigurationOverride = {
            ...override,
            [key]: value,
        };
        // console.log(updatedSystemConfigurationOverride)
        const regex = /Override/;
        const identical = Object.entries(updatedSystemConfigurationOverride)
            .every(([key, value]) => !key.match(regex)
                ||
                typeof value === 'object'
                ||
                isNullOrUndefined(updatedSystemConfigurationOverride[key])
                ||
                updatedSystemConfigurationOverride[key] === [key.replace(regex, '')]
            );

        const {
            requiredOverride,
            // mirrorableOverride,
            // presentationLevelOverride,
            // overrideLevelOverride,
        } = updatedSystemConfigurationOverride;

        if (identical) {
            // if the override is identical to the systemtypedetailtypeconfigurationtype
            updateSystem(ACTIONS.DELETE_OVERRIDE, {
                detailType,
                configurationType,
            });
        } else {
            // if we are working with a newly-created override
            updateSystem(ACTIONS.UPDATE_OVERRIDE, {
                detailType,
                configurationType,
                requiredOverride,
                // mirrorableOverride,
                // presentationLevelOverride,
                // overrideLevelOverride,
            });
        }
    }

    return (
        <GroupingBox
            title="Override Settings"
        >
            {/* <Input
                label="Mirrorable"
                type="switch"
                checked={mirrorableOverride === undefined ?
                    mirrorable
                    :
                    mirrorableOverride}
                onChange={({ target: { checked } }) => handleChange("mirrorableOverride", checked)}
            /> */}
            <Input
                label="Required"
                type="switch"
                checked={requiredOverride === undefined ?
                    required
                    :
                    requiredOverride}
                onChange={({ target: { checked } }) => handleChange("requiredOverride", checked)}
            />
            {/* <Input
                label="Presentation Level"
                type="select"
                select={{
                    value: {
                        value: presentationLevelOverride,
                        label: presentationLevelOverride,
                    },
                    options: presentationLevels.map(({ name }) => ({
                        value: name,
                        label: name,
                    })),
                    onChange: ({ name }) => handleChange("presentationLevelOverride", name)
                }}
            /> */}
            {/* <Input
                label="Override Level"
                type="select"
                select={{
                    value: {
                        value: overrideLevelOverride,
                        label: overrideLevelOverride,
                    },
                    options: presentationLevels.map(({ name }) => ({
                        value: name,
                        label: name,
                    })),
                    onChange: ({ name }) => handleChange("overrideLevelOverride", name)
                }}
            /> */}
        </GroupingBox>
    );
}
