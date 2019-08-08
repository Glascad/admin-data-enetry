import React from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

import { DELETE_OVERRIDE, UPDATE_OVERRIDE } from '../ducks/actions';

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
    
    // updateSystem(ACTIONS.UPDATE_OVERRIDE, {
    //     detailType,
    //     configurationType,
    //     requiredOverride,
        // mirrorableOverride,
        // presentationLevelOverride,
        // overrideLevelOverride,
    // });


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
                onChange={({ target: { checked } }) => updateSystem(UPDATE_OVERRIDE,
                    {
                        detailType,
                        configurationType,
                        requiredOverride,
                        ...override,
                        ["requiredOverride"]: checked
                    })
                }
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
