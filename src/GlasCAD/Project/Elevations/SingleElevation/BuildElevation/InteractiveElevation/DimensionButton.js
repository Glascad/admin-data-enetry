import React from 'react';

import { SelectionContext } from '../SelectionContext';

export default function DimensionButton({
    vertical,
    dimension: {
        refIds = [],
        x,
        y,
        height,
        width,
    },
}) {
    // remember rotation
    const offset = vertical ?
        y
        :
        x;

    const dimension = vertical ?
        height
        :
        width;

    const placementX = vertical ?
        -50
        :
        offset;

    const placementY = vertical ?
        offset
        :
        -50;

    const placementHeight = vertical ?
        dimension
        :
        25;

    const placementWidth = vertical ?
        25
        :
        dimension;

    return (
        <SelectionContext.Consumer>
            {({
                selection: {
                    items,
                    handleMouseDown,
                },
            }) => {
                const isSelected = refIds.some(refId => items.includes(refId));

                return (
                    <g>
                        <rect
                            id={`DimensionButton-${refIds.join('-')}`}
                            x={placementX}
                            y={placementY}
                            height={placementHeight}
                            width={placementWidth}
                            fill={isSelected ?
                                "#4A90E2"
                                :
                                "white"}
                            stroke={isSelected ?
                                "none"
                                :
                                "#CCCCCC"}
                            onClick={() => refIds.forEach(id => handleMouseDown({ target: { id } }))}
                        />
                        <text
                            x={placementX}
                            y={-placementY}
                            transform={`scale(1, -1) ${
                                // vertical ? 'rotate(-90)' :
                                    ''
                                }`}
                        >
                            {dimension.toFixed(2)}
                        </text>
                    </g>
                );
            }}
        </SelectionContext.Consumer>
    );
}
