import React from 'react';
import { SVGPath } from '../../components';
import { Matrix } from '../../utils';
import getConfigurationPartIdFromPath from '../../app-logic/system/get-configuration-part-id-from-path';

export default function Part({
    part,
    part: {
        id,
        transform,
        path,
        _part: {
            paths = [],
        } = {},
    } = {},
    onClick,
    className = "",
}) {

    const matrix = new Matrix(transform);

    return (
        <g
            data-cy={`part-${getConfigurationPartIdFromPath(path)}`}
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
