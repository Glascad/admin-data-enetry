import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { match, replace } from '../../../utils';

const multiplier = 250;

const multiplyArguments = ({ command, arguments: args = [], ...rest }) => ({
    ...rest,
    command,
    arguments: match(command)
        .in(['M', 'L'], args.map(n => n * multiplier))
        .equals('A', args.map((n, i) => (
            match(i)
                .in([0, 1, 5, 6], n * multiplier)
                .otherwise(n)))
        )
        .otherwise(args)
});

const joinArguments = ({ command, arguments: args, ...rest }) => ({
    ...rest,
    command,
    arguments: args,
    d: `${
        command
        }${
        args
            .map(n => n.toFixed(4).replace(/\.?0+$/g, ''))
            .join(',')
        }`,
});

const getViewBox = (paths, multiplier) => {

    const commands = paths.reduce((allCommands, { commands }) => allCommands.concat(commands), []);

    const coordinates = commands
        .reduce((vals, { command, arguments: [one, two, three, four, five, six, seven] = [] }) => vals.concat(
            match(command)
                .against({
                    M: { x: one, y: two },
                    L: { x: one, y: two },
                    A: { x: six, y: seven },
                })
                .otherwise([])
        ), []);
    const xValues = coordinates.map(({ x }) => x * multiplier || 0);
    const yValues = coordinates.map(({ y }) => y * multiplier || 0);
    // console.log({ coordinates, xValues, yValues });
    return {
        x: {
            min: (Math.min(...xValues) || 0),
            max: (Math.max(...xValues) || 0),
        },
        y: {
            min: (Math.min(...yValues) || 0),
            max: (Math.max(...yValues) || 0),
        },
        toString() {
            return `${
                this.x.min
                } ${
                this.y.min
                } ${
                this.x.max - this.x.min
                } ${
                this.y.max - this.y.min
                }`;
        },
    };
}

export default function SVG({
    paths = [],
    className = '',
}) {
    console.log(arguments[0]);
    const [selectedPathIndex, selectPath] = useState();
    return (
        <svg
            className={className}
            viewBox={getViewBox(paths, multiplier)}
            transform="scale(1, -1)"
        >
            {paths.map(({ commands, color }, i) => (
                <path
                    className={i === selectedPathIndex ? 'selected' : ''}
                    key={i}
                    d={commands
                        .map(multiplyArguments)
                        .map(joinArguments)
                        .map(({ d }) => d)
                        .join('')
                    }
                    onClick={() => {
                        selectPath(i);
                        console.log({ paths });
                    }}
                    style={commands.reduce((s, { style }) => ({
                        ...s,
                        ...style,
                    }), { fill: color })}
                />
            ))}
        </svg>
    );
}
