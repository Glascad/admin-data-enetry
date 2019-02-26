import React from 'react';

import {
    GroupingBox,
} from '../../../components';

import './ElevationPreview.scss';

export default function ElevationPreview({
    elevation,
    elevation: {
        placedContainers = [],
        placedFrames = [],
        roughOpening: {
            x = 0,
            y = 0,
        } = {},
    },
}) {
    console.log(arguments[0]);
    return (
        <GroupingBox
            title="Elevation Preview"
            className="ElevationPreview"
        >
            <svg
                height={y}
                width={x}
                viewBox={`0 0 ${x} ${y}`}
                transform="scale(1, -1)"
            >
                <rect
                    width={x}
                    height={y}
                    x={0}
                    y={0}
                    fill="rgba(127, 191, 255, 0.25)"
                    stroke="black"
                />
                {placedContainers.map(({ x, y, height, width, id }) => (
                    <g>
                        <rect
                            {...{
                                x,
                                y,
                                height,
                                width,
                            }}
                            fill="rgba(0, 191, 255, 0.25)"
                            stroke="black"
                        />
                        <text
                            x={x + width / 2}
                            y={-(y + height / 2)}
                            transform="scale(1, -1)"
                        >
                            {id}
                        </text>
                    </g>
                ))}
                {placedFrames.map(({ x, y, height, width }) => (
                    <rect
                        {...{
                            x,
                            y,
                            height,
                            width,
                        }}
                        fill="rgba(255, 191, 0, 0.25)"
                        stroke="black"
                    />
                ))}
            </svg>
        </GroupingBox>
    );
}
