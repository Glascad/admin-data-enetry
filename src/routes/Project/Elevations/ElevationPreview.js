import React from 'react';

export default function ElevationPreview({
    elevation,
    elevation: {
        width,
        height,
        lites,
        frames,
    },
}) {
    return (
        <svg>
            <rect
                width={width * 3}
                height={height * 3}
                x={0}
                y={0}
                fill="rgba(127, 191, 255, 0.25)"
            />
        </svg>
    );
}
