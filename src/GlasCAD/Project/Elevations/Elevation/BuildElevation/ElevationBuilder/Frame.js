import React from 'react';

export default function Frame({
    state: {
        focusedRefId,
    },
    methods: {
        handleFocus,
    },
    _frame: {
        x,
        y,
        height,
        width,
        refId,
    },
    finishedFloorHeight,
}) {
    const isFocused = focusedRefId === refId;
    return (
        <rect
            id={refId}
            x={x}
            y={y + finishedFloorHeight}
            height={height}
            width={width}
            fill={`rgba(0, 0, 0, ${
                isFocused ?
                    0.25
                    :
                    0.05
                })`}
            stroke="black"
            strokeWidth={0.5}
            onClick={handleFocus}
        />
    );
}
