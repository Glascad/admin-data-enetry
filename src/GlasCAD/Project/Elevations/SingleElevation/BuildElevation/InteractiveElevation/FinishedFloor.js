import React from 'react';

export default function FinishedFloor({
    finishedFloorHeight = 0,
}) {
    return (
        <path
            d={`M-10000,${-finishedFloorHeight}L10000,${-finishedFloorHeight}`}
            stroke="black"
            strokeWidth={5}
        />
    );
}