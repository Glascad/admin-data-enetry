import match from "./match";

export const multiplier = 250;

export const multiplyArguments = ({ command, arguments: args = [], ...rest }) => ({
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

export const joinArguments = ({ command, arguments: args, ...rest }) => ({
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

export const getViewBox = (paths, padding = 0) => {

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
            min: (Math.min(...xValues) || 0) - (padding * multiplier),
            max: (Math.max(...xValues) || 0) + (padding * multiplier),
        },
        y: {
            min: (Math.min(...yValues) || 0) - (padding * multiplier),
            max: (Math.max(...yValues) || 0) + (padding * multiplier),
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
