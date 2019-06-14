import React from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

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
    presentationLevels,
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
                    value: {
                        value: presentationLevel,
                        label: presentationLevel,
                    },
                    options: presentationLevels.map(({ name }) => ({
                        value: name,
                        label: name,
                    }))
                }}
            />
            <Input
                label="Override Level"
                type="select"
                select={{
                    isDisabled: true,
                    value: {
                        value: overrideLevel,
                        label: overrideLevel,
                    },
                    options: presentationLevels.map(({ name }) => ({
                        value: name,
                        label: name,
                    })),
                }}
            />
        </GroupingBox>
    );
}
