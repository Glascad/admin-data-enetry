import React from 'react';

import {
    GroupingBox,
    Input,
} from '../../../../../../components';

import ACTIONS from '../ducks/actions';

export default function SystemTypeDetailTypeConfigurationType({
    override,
    required,
    // mirrorable,
    // presentationLevel,
    // overrideLevel,
    configurationType,
    detailType,
    // presentationLevels,
    updateSystem,
}) {
    return (
        <GroupingBox
            title="Default Settings"
            // className="disabled"
            toggle={{
                buttons: [
                    {
                        text: "Override",
                        selected: false,
                        className: override ?
                            "selected"
                            :
                            "danger",
                        onClick: () => updateSystem(override ?
                            ACTIONS.DELETE_OVERRIDE
                            :
                            ACTIONS.CREATE_OVERRIDE, {
                                detailType,
                                configurationType,
                            }),
                    },
                ],
            }}
        >
            {/* <Input
                label="Mirrorable"
                type="switch"
                checked={mirrorable}
                readOnly={true}
            /> */}
            <Input
                label="Required"
                type="switch"
                checked={required}
                readOnly={true}
            />
            {/* <Input
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
            /> */}
            {/* <Input
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
            /> */}
        </GroupingBox>
    );
}
