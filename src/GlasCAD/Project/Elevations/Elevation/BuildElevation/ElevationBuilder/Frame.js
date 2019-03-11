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
            fill={`rgba(255, 0, 0, ${
                isFocused ?
                    1
                    :
                    0.25
                })`}
            stroke="black"
            onClick={handleFocus}
        />
    );
}
