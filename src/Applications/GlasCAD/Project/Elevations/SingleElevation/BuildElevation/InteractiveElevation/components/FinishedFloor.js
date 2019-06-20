import React from 'react';
import { withTransformContext } from '../../contexts/TransformContext';

function FinishedFloor({
    finishedFloorHeight = 0,
    transform: {
        scale: {
            y,
        },
    },
}) {
    return (
        <div
            id="FinishedFloor"
            style={{
                bottom: -finishedFloorHeight,
                transform: `scaleY(${1 / y})`,
            }}
        />
    );
}

export default withTransformContext(FinishedFloor);
