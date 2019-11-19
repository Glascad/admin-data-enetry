import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { multiply } from 'mathjs';
import { svg, matrix } from '../../../utils';

const DEFAULT_MATRIX = multiply(
    matrix.IDENTITY_MATRIX,
    matrix.IDENTITY_MATRIX,
    // matrix.createCenteredRotation(45, { x: 250, y: 250 }),
    // matrix.createTranslation(0, -500),
    // matrix.createRotation(10),
    // matrix.createTranslation(-250, -250),
);

export function SVGPath({
    className = '',
    commands = [],
    transform: {
        a = DEFAULT_MATRIX[0][0],
        b = DEFAULT_MATRIX[0][1],
        c = DEFAULT_MATRIX[0][2],
        d = DEFAULT_MATRIX[1][0],
        e = DEFAULT_MATRIX[1][1],
        f = DEFAULT_MATRIX[1][2],
    } = {},
    onClick,
    color,
}) {
    const transform = `matrix(${a} ${d} ${b} ${e} ${c} ${f})`;
    console.log({ transform });
    return (
        <path
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
    paths = [],
    className = '',
}) {
    const [selectedPathIndex, selectPath] = useState();
    return (
        <svg
            className={className}
            viewBox={svg.getViewBox(paths)}
            transform="scale(1, -1)"
        >
            {paths.map(({ commands, color }, i) => (
                <SVGPath
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
