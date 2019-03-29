import React from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

import {
    presentationLevels,
} from '../../../../../../business-logic';

import ACTIONS from '../ducks/actions';

export default function SystemTypeDetailTypeConfigurationType({
    _systemConfigurationOverride,
    defaultValues: {
        mirrorable,
        required,
        presentationLevel,
        overrideLevel,
    } = {},
    _configurationType: {
        id: configurationTypeId,
    } = {},
    _detailType: {
        id: detailTypeId,
    } = {},
    updateSystem,
}) {
    return (
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
                            ACTIONS.OVERRIDE.DELETE
                            :
                            ACTIONS.OVERRIDE.CREATE, {
                                detailTypeId,
                                configurationTypeId,
                            }),
                    },
                ],
            }}
        >
            <Input
                label="Mirrorable"
                type="switch"
                checked={mirrorable}
                readOnly={true}
            />
            <Input
                label="Required"
                type="switch"
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
    );
}
