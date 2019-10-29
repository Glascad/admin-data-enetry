import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { match } from '../../../utils';

const multiplier = 250;

const hasCommand = ({ command }) => command;

const multiplyArguments = ({ command, arguments: args, ...rest }) => ({
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
    const moveToCommands = path.filter(({ command }) => command === 'M');
    const xValues = moveToCommands.map(({ arguments: [x] }) => x * multiplier);
    const yValues = moveToCommands.map(({ arguments: [x, y] }) => y * multiplier);
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
    console.log(arguments[0]);
    const pathArray = _.chunk(path.filter(hasCommand).map(multiplyArguments).map(joinArguments), 2);
    console.log({ pathArray });
    const [selectedPath, selectPath] = useState(0);
    const handleKeyDown = e => {
        const { key = '' } = e;
        if (key.match(/Arrow(Up|Down|Left|Right)/)) {
            e.preventDefault();
            if (key.match(/Up|Left/)) selectPath(i => i - 1 % pathArray.length);
            else selectPath(i => i + 1 % pathArray.length);
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);
    return (
        <svg
            className={className}
            viewBox={getViewBox(path, multiplier)}
            transform="scale(1, -1)"
        >
            {pathArray.map(([{ d: da, ...a }, { d: db, ...b }], i) => (
                <path
                    className={i === selectedPath ? 'selected' : ''}
                    key={i}
                    d={da + db}
                    onClick={() => {
                        selectPath(i);
                        console.log({ a, b });
                    }}
                />
            ))}
        </svg>
    );
}
