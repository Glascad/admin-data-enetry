import React, { useState } from 'react';
import _ from 'lodash';
import { match } from '../../../utils';
import { Input } from '../..';

const multiplyArguments = multiplier => ({ command, arguments: args, ...rest }) => ({
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

    const [multiplier, setMultiplier] = useState(18);

    console.log(arguments[0]);

    const paths = _.chunk(path.map(multiplyArguments(multiplier)).map(joinArguments), 2);

    console.log({ paths });

    return (
        <>
            <Input
                label="Multiplier"
                type="number"
                value={multiplier}
                onChange={({ target: { value } }) => setMultiplier(value)}
            />
            <svg
                className={className}
                viewBox={getViewBox(path, multiplier)}
                transform="scale(1, -1)"
            >
                {paths.map(([{ d: da, ...a }, { d: db, ...b }], i) => (
                    <path
                        key={i}
                        d={da + db}
                        onClick={() => console.log({ a, b })}
                    />
                ))}
            </svg>
        </>
    );
}
