import React from 'react';

import {
    TitleBar,
    Input,
} from '../../../../components';

import ACTIONS from '../elevation-manager/elevation-actions';

export default function ElevationInfo({
    elevation: {
        name,
        horizontalRoughOpening,
        verticalRoughOpening,
        elevationContainers,
    } = {},
    updateElevation,
}) {
    console.log(arguments[0]);
    return (
        <>
            <TitleBar
                title="Elevation Info"
                selections={[name]}
            />
            <Input
                label="Name"
                value={name}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    name: value,
                })}
            />
            <Input
                label="Horizontal Rough Opening"
                type="number"
                value={horizontalRoughOpening}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    horizontalRoughOpening: value,
                })}
            />
            <Input
                label="Vertical Rough Opening"
                type="number"
                value={verticalRoughOpening}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    verticalRoughOpening: value,
                })}
            />
        </>
    )
}
