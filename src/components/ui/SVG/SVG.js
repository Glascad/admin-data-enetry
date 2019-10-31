import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { match, replace } from '../../../utils';

const multiplier = 250;

const hasCommand = ({ command }) => command;

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

const getViewBox = (path, multiplier) => {

    const coordinates = path
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
            min: (Math.min(...xValues) || 0) - (multiplier / 2),
            max: (Math.max(...xValues) || 0) + (multiplier / 2),
        },
        y: {
            min: (Math.min(...yValues) || 0) - (multiplier / 2),
            max: (Math.max(...yValues) || 0) + (multiplier / 2),
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
    path = [],
    className = '',
}) {
    // console.log(arguments[0]);
    const pathArray = path.filter(hasCommand).map(multiplyArguments).map(joinArguments);
    const groupedPath = pathArray.reduce((ds, item) => {
        const { command } = item;
        if (command === 'M') return [...ds, [item]];
        const lastIndex = ds.length - 1;
        const lastItem = ds[lastIndex] || [];
        return replace(ds, lastIndex, lastItem.concat(item));
    }, []);
    // console.log({ pathArray, groupedPath });
    const [selectedPathIndex, selectPath] = useState();
    // const handleKeyDown = e => {
    //     const { key = '' } = e;
    //     if (key.match(/Arrow(Up|Down|Left|Right)/)) {
    //         e.preventDefault();
    //         if (key.match(/Up|Left/))
    //             selectPath(i => i - 1 % pathArray.length);
    //         else
    //             selectPath(i => i + 1 % pathArray.length);
    //     }
    // }
    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     }
    // }, []);
    return (
        <svg
            className={className}
            viewBox={getViewBox(path, multiplier)}
            transform="scale(1, -1)"
        >
            {groupedPath.map((items, i) => (
                <path
                    className={i === selectedPathIndex ? 'selected' : ''}
                    key={i}
                    d={items.map(({ d }) => d).join('')}
                    onClick={() => {
                        selectPath(i);
                        console.log({ items });
                    }}
                    style={items.reduce((s, { style }) => ({
                        ...s,
                        ...style,
                    }), {})}
                />
            ))}
        </svg>
    );
}
