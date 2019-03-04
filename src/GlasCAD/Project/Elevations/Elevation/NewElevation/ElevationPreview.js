import React from 'react';

import {
    GroupingBox,
} from '../../../../../components';

export default function ElevationPreview({
    elevation: {
        placedContainers = [],
        placedDetails = [],
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
                {placedContainers.map(({ x, y, height, width, id }) => (
                    <g
                        key={id}
                    >
                        <rect
                            id={`Container-${id}`}
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
                            x={x + width / 2}
                            y={-(y + finishedFloorHeight + height / 2)}
                            transform="scale(1, -1)"
                        >
                            {id}
                        </text>
                    </g>
                ))}
                {/* DETAILS */}
                {placedDetails.map(({ x, y, height, width, id }) => (
                    <g
                        key={id}
                    >
                        <rect
                            id={`Detail-${id}`}
                            {...{
                                x,
                                y: y + finishedFloorHeight,
                                height,
                                width,
                            }}
                            fill="rgba(255, 191, 0, 0.25)"
                            stroke="black"
                        />
                        {/* <text
                            style="font-size: 10px;"
                            x={x + width / 2}
                            y={-(y + finishedFloorHeight + height / 2)}
                            transform="scale(1, -1)"
                        >
                            {id}
                        </text> */}
                    </g>
                ))}
            </svg>
        </GroupingBox>
    );
}
