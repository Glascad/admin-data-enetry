import React from 'react';

import {
    TitleBar,
    Input,
} from '../../../../../components';

import ACTIONS from '../elevation-manager/elevation-actions';

export default function ElevationInfo({
    elevation,
    elevation: {
        name,
        roughOpening: {
            x,
            y,
        },
        finishedFloorHeight,
        _elevationContainers = [],
        _containerDetails = [],
    },
    // elevationInput: {
    //     name,
    //     horizontalRoughOpening,
    //     verticalRoughOpening,
    //     elevationContainers = [],
    //     finishedFloorHeight,
    // },
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
                label="Rough Opening Height"
                type="number"
                value={y}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    verticalRoughOpening: +value,
                })}
            />
            <Input
                label="Rough Opening Width"
                type="number"
                value={x}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    horizontalRoughOpening: +value,
                })}
            />
            <Input
                label="Starting Bay Quantity"
                type="number"
                value={_elevationContainers
                    .filter(({ id }) => _containerDetails
                        .some(({
                            firstContainerId,
                            secondContainerId,
                            vertical,
                        }) => !vertical
                        &&
                        firstContainerId === undefined
                            &&
                            secondContainerId === id)
                    ).length}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    startingBayQuantity: +value,
                })}
            />
            <Input
                label="Height Above Finished Floor"
                type="number"
                value={finishedFloorHeight}
                onChange={({ target: { value } }) => updateElevation(ACTIONS.UPDATE, {
                    finishedFloorHeight: +value,
                })}
            />
        </>
    )
}
