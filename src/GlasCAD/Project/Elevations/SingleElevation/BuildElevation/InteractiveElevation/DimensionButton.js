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

    const placementX = offset;

    const placementY = vertical ?
        50
        :
        -75;

    const placementHeight = 25;

    const placementWidth = dimension;

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
                    <g transform={vertical ? 'rotate(90)' : ''} >
                        <rect
                            id={`DimensionButton-${refIds.join('-')}`}
                            x={placementX}
                            y={placementY}
                            height={placementHeight}
                            width={placementWidth}
                            fill={isSelected ?
                                "#4A90E2"
                                :
                                "rgba(255, 255, 255, 0.1)"}
                            stroke={isSelected ?
                                "none"
                                :
                                "#CCCCCC"}
                            onClick={() => refIds.forEach(id => handleMouseDown({ target: { id } }))}
                        />
                        <text
                            x={placementX}
                            y={-placementY}
                            transform='scale(1, -1)'
                        >
                            {dimension.toFixed(2)}
                        </text>
                    </g>
                );
            }}
        </SelectionContext.Consumer>
    );
}
