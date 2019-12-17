import React from 'react';
import { SVGPath } from '../../components';
import { Matrix } from '../../utils';

export default function Part({
    part,
    part: {
        id,
        transform,
        _part: {
            paths = [],
        } = {},
    },
    onClick,
    className = "",
}) {

    const matrix = new Matrix(transform);

    return (
        <g
            className={`Part ${className}`}
            key={id}
            onClick={e => {
                e.stopPropagation();
                onClick(part);
            }}
            transform={matrix}
        >
            {paths.map(({ commands }, i) => (
                <SVGPath
                    key={i}
                    commands={commands}
                />
            ))}
        </g>
    );
}
