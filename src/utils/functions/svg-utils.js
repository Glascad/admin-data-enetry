import { Matrix } from "..";
import match from "./match";

export const multiplyArguments = ({ command, arguments: args = [], ...rest }) => ({
    ...rest,
    command,
    arguments: match(command)
        .in(['M', 'L'], args.map(n => n))
        .equals('A', args.map((n, i) => (
            match(i)
                .in([0, 1, 5, 6], n)
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

export const getCommandCoordinates = commands => commands.reduce((vals, {
    command,
    arguments: [one, two, three, four, five, six, seven] = [],
}) => vals.concat(
    match(command)
        .against({
            M: { x: one, y: two },
            L: { x: one, y: two },
            A: { x: six, y: seven },
        })
        .otherwise([])
), []);

export const transformCoordinates = (coordinates, transform) => {
    console.log({ coordinates, transform });
    if (!transform) return coordinates;
    else {
        const matrix = new Matrix(transform);
        return coordinates.map(({ x, y }) => matrix.transformCoordinate(x, y));
    }
}

export const getPartCoordinates = ({ paths }) => paths.reduce((coordinates, { commands }) => coordinates.concat(getCommandCoordinates(commands)), []);

export const getTransformedPartCoordinates = (part, transform) => transformCoordinates(getPartCoordinates(part), transform);

export const getPartExtremities = ({ paths }, transform) => getCoordinateExtremities(getTransformedPartCoordinates({ paths }, transform));

export const getCoordinateExtremities = coordinates => {
    console.log({ coordinates });
    const xValues = coordinates.map(({ x }) => x || 0);
    const yValues = coordinates.map(({ y }) => y || 0);
    return {
        x: {
            min: (Math.min(...xValues) || 0),
            max: (Math.max(...xValues) || 0),
        },
        y: {
            min: (Math.min(...yValues) || 0),
            max: (Math.max(...yValues) || 0),
        },
    };
}

export const getViewBox = (paths, padding = 0) => {
    const extremes = getPartExtremities({ paths });
    return `${
        extremes.x.min - padding
        } ${
        extremes.y.min + padding
        } ${
        extremes.x.max - extremes.x.min - padding
        } ${
        extremes.y.max - extremes.y.min + padding
        }`;
};
