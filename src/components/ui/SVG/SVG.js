import React, { useState } from 'react';
import { Matrix, svg } from '../../../utils';
import { getPartExtremities } from '../../../utils/functions/svg-utils';

export function SVGPath({
    dataCy,
    className = '',
    commands = [],
    transform: matrix,
    onClick,
    color,
}) {

    const transform = new Matrix(matrix);

    return (
        <path
            data-cy={dataCy}
            className={className}
            onClick={onClick}
            d={commands
                .map(svg.multiplyArguments)
                .map(svg.joinArguments)
                .map(({ d }) => d)
                .join('')
            }
            style={commands.reduce((s, { style }) => ({
                ...s,
                ...style,
            }), { fill: color })}
            transform={transform}
        />
    );
}

export default function SVG({
    dataCy,
    paths = [],
    className = '',
}) {
    const [selectedPathIndex, selectPath] = useState();
    const extremeValues = getPartExtremities({ paths });
    const viewBox = svg.getViewBox(extremeValues);
    // console.log({ viewBox, extremeValues, paths });
    return (
        <svg
            className={className}
            viewBox={viewBox}
            transform="scale(1, -1)"
        >
            {paths.map(({ commands, color }, i) => (
                <SVGPath
                    dataCy={dataCy}
                    commands={commands}
                    color={color}
                    className={i === selectedPathIndex ? 'selected' : ''}
                    key={i}
                    onClick={() => {
                        selectPath(i);
                        console.log({ paths });
                    }}
                />
            ))}
        </svg>
    );
}
