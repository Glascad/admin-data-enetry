import React from 'react';
import Container from './Container';
import Frame from './Frame';

export default function ElevationBuilder({
    state,
    methods,
    elevation: {
        placedContainers = [],
        placedFrames = [],
        roughOpening: {
            x = 0,
            y = 0,
        } = {},
        finishedFloorHeight,
    },
}) {
    return (
        <div>
            <svg
                width={x}
                height={y + finishedFloorHeight}
                viewBox={`0 0 ${x} ${y + finishedFloorHeight}`}
                transform="scale(1, -1)"
            >
                {/* ROUGH OPENING */}
                <rect
                    width={x}
                    height={y}
                    x={0}
                    y={finishedFloorHeight}
                    // fill="rgba(127, 191, 255, 0.25)"
                    fill="rgba(0, 0, 0, 0)"
                    stroke="black"
                />
                {/* FINISHED FLOOR */}
                <path
                    d={`M0,0L${x},0`}
                    stroke="black"
                    strokeWidth={5}
                />
                {/* CONTAINERS */}
                {placedContainers.map(container => (
                    <Container
                        key={container.refId}
                        state={state}
                        methods={methods}
                        container={container}
                        finishedFloorHeight={finishedFloorHeight}
                    />
                ))}
                {/* FRAMES */}
                {placedFrames.map(_frame => (
                    <Frame
                        key={_frame.refId}
                        state={state}
                        methods={methods}
                        _frame={_frame}
                        finishedFloorHeight={finishedFloorHeight}
                    />
                ))}
            </svg>
        </div>
    );
}
