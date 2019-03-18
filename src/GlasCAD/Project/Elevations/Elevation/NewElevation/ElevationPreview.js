import React from 'react';

import {
    GroupingBox,
} from '../../../../../components';

export default function ElevationPreview({
    elevation: {
        placedContainers = [],
        // placedDetails = [],
        placedFrames = [],
        roughOpening: {
            x = 0,
            y = 0,
        } = {},
        finishedFloorHeight,
    },
}) {
    console.log(arguments[0]);
    return (
        <GroupingBox
            title="Elevation Preview"
            className="ElevationPreview"
        >
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
                {placedContainers.map(({ x, y, height, width, refId }) => (
                    <g
                        key={refId}
                    >
                        <rect
                            id={refId}
                            {...{
                                x,
                                y: y + finishedFloorHeight,
                                height,
                                width,
                            }}
                            fill="rgba(0, 191, 255, 0.25)"
                            stroke="black"
                        />
                        <text
                            x={x + 10}
                            y={-(y + finishedFloorHeight + 10)}
                            transform="scale(1, -1)"
                        >
                            {refId}
                        </text>
                    </g>
                ))}
                {/* DETAILS */}
                {/* {placedDetails.map(({ x, y, height, width, refId }) => (
                    <g
                        key={refId}
                    >
                        <rect
                            id={refId}
                            {...{
                                x,
                                y: y + finishedFloorHeight,
                                height,
                                width,
                            }}
                            fill="rgba(255, 191, 0, 0.25)"
                            stroke="black"
                        />
                    </g>
                ))} */}
                {/* FRAMES */}
                {placedFrames.map(({ x, y, height, width, refId }) => (
                    <rect
                        key={refId}
                        id={refId}
                        {...{
                            x,
                            y: y + finishedFloorHeight,
                            height,
                            width,
                        }}
                        fill="rgba(255, 0, 0, 0.5)"
                        stroke="black"
                    />
                ))}
            </svg>
        </GroupingBox>
    );
}
