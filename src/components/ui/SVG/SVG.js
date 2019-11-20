import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { multiply } from 'mathjs';
import { svg, Matrix } from '../../../utils';

export function SVGPath({
    className = '',
    commands = [],
    transform: matrix,
    onClick,
    color,
}) {
    const transform = new Matrix(matrix);
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
