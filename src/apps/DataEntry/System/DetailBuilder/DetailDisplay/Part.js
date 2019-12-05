import React from 'react';
import { SVGPath } from '../../../../../components';
import { Matrix } from '../../../../../utils';

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
                <path d={`M-${padding / 2},0L${padding / 2},0Z`} />
                <path d={`M0,-${padding / 2}L0,${padding / 2}Z`} />
                <circle
                    cx={0}
                    cy={0}
                    r={padding / 8}
                />
            </g>
        </g>
    );
}
