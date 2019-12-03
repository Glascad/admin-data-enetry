import React from 'react';
import { Matrix, svg } from '../../../../../utils';
import { SVGPath } from '../../../../../components';

export default function Part({
    part,
    part: {
        id,
        transform: matrix,
        _part: {
            partNumber,
            paths = [],
        } = {},
    },
    selectItem,
    selectedItem,
    padding,
}) {
    const selected = part === selectedItem;
    const transform = new Matrix(matrix);
    return (
        <g
            data-cy={`part-${id}`}
            key={id}
            className={`Part ${selected ? 'selected' : ''}`}
            onClick={e => {
                e.stopPropagation();
                selectItem(part);
            }}
            transform={transform}
        >
            {paths.map(({ commands }, i) => (
                <SVGPath
                    key={i}
                    commands={commands}
                />
            ))}
            <g className="part-origin">
                <path d={`M-${padding * svg.multiplier / 2},0L${padding * svg.multiplier / 2},0Z`} />
                <path d={`M0,-${padding * svg.multiplier / 2}L0,${padding * svg.multiplier / 2}Z`} />
                <circle
                    cx={0}
                    cy={0}
                    r={padding * svg.multiplier / 8}
                />
            </g>
        </g>
    );
}
