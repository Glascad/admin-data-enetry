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
        vertical,
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
            fill={isFocused ?
                "#4A90E2"
                :
                `rgba(0, 0, 0, ${
                vertical ?
                    0.45
                    :
                    0.25
                })`}
            // stroke="black"
            // strokeWidth={0.5}
            onClick={handleFocus}
        />
    );
}
