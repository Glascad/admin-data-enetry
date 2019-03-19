import React from 'react';

export default function Container({
    state: {
        focusedRefId,
    },
    methods: {
        handleFocus,
    },
    container: {
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
        <g>
            <rect
                id={refId}
                x={x}
                y={y + finishedFloorHeight}
                height={height}
                width={width}
                fill={`rgba(0, 191, 255, ${
                    isFocused ?
                        0.5
                        :
                        0.1
                    })`}
                stroke="black"
                onClick={handleFocus}
            />
            <text
                x={x + 10}
                y={-(y + finishedFloorHeight + 10)}
                transform="scale(1, -1)"
            >
                {refId.replace(/\D*/, '*')}
            </text>
        </g>
    );
}
