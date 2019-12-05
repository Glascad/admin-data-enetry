import match from "./match";
import { Matrix, DIRECTIONS } from "..";

const {
    DOWN,
    UP,
    LEFT,
    RIGHT,
    VCENTER,
    HCENTER,
} = DIRECTIONS

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

export const getCommandCoordinates = commands => commands
    .reduce((vals, { command, arguments: [one, two, three, four, five, six, seven] = [] }) => vals.concat(
        match(command)
            .against({
                M: { x: one, y: two },
                L: { x: one, y: two },
                A: { x: six, y: seven },
            })
            .otherwise([])
    ), []);

export const getPartCoordinates = ({ paths }) => paths.reduce((coordinates, { commands }) => coordinates.concat(getCommandCoordinates(commands)), []);

export const getTransformedPartCoordinates = (part, transform) => {
    const transformMatrix = new Matrix(transform);
    return getPartCoordinates(part).map(({ x, y }) => transformMatrix.transformCoordinate(x, y));
}

export const getPartExtremities = ({ paths }, transform) => {
    const coordinates = getTransformedPartCoordinates({ paths }, transform);
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

export const getAlignmentCoordinate = window.getAlignmentCoordinate = (vertical, first, selectedItem = {}) => {

    const {
        _part: {
            paths = [],
        } = {},
        transform = {},
    } = selectedItem;

    const {
        x: {
            min: xMin,
            max: xMax,
        },
        y: {
            min: yMin,
            max: yMax,
        },
    } = getPartExtremities({ paths }, transform);

    return match(vertical, first)
        .equals(...DOWN, yMin)
        .equals(...UP, yMax)
        .equals(...LEFT, xMin)
        .equals(...RIGHT, xMax)
        .equals(...VCENTER, (yMax + yMin) / 2)
        .equals(...HCENTER, (xMax + xMin) / 2)
        .otherwise(() => {
            throw new Error(`invalid direction vertical: ${vertical} first: ${first}`)
        });
};