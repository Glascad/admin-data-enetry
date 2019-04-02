import React from 'react';

export default function FinishedFloor({
    finishedFloorHeight = 0,
}) {
    return (
        <div
            id="FinishedFloor"
            style={{
                bottom: -finishedFloorHeight,
            }}
        />
    );
}