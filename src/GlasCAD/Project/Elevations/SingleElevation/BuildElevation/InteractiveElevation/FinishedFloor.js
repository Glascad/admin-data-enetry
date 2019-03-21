import React from 'react';

export default function FinishedFloor({
    finishedFloorHeight = 0,
    width = 0,
}) {
    return (
        <path
            d={`M0,${-finishedFloorHeight}L${width},${-finishedFloorHeight}`}
            stroke="black"
            strokeWidth={5}
        />
    );
}