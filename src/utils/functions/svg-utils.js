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
), [])
    .filter(({ x, y }) => typeof x === 'number' && typeof y === 'number');

export const transformCoordinates = (coordinates, transform) => {
    // console.log({ coordinates, transform });
    if (!transform) return coordinates;
    else {
        const matrix = new Matrix(transform);
        return coordinates.map(({ x, y }) => matrix.transformCoordinate(x, y));
    }
}

export const getPartCoordinates = ({ paths }) => paths.reduce((coordinates, { commands }) => coordinates.concat(getCommandCoordinates(commands)), []);

export const getTransformedPartCoordinates = (part, transform) => transformCoordinates(getPartCoordinates(part), transform);

export const getPartExtremities = ({ paths = [] } = {}, transform) => getCoordinateExtremities(getTransformedPartCoordinates({ paths }, transform));

const getMin = nums => (nums.length ? Math.min(...nums) : 0) || 0;
const getMax = nums => (nums.length ? Math.max(...nums) : 0) || 0;

export const getCoordinateExtremities = coordinates => {
    // console.log({ coordinates });
    const xValues = coordinates.map(({ x }) => x || 0);
    const yValues = coordinates.map(({ y }) => y || 0);
    console.log({
        xValues,
        yValues, 
        endResult: {
            x: {
                min: getMin(xValues),
                max: getMax(xValues),
            },
            y: {
                min: getMin(yValues),
                max: getMax(yValues),
            },
        }
    });
    return {
        x: {
            min: getMin(xValues),
            max: getMax(xValues),
        },
        y: {
            min: getMin(yValues),
            max: getMax(yValues),
        },
    };
}

export const joinExtremities = extremities => getCoordinateExtremities(
    extremities.reduce((coordinates, { x = {}, y = {} }) => coordinates.concat([{
        x: x.min,
        y: y.min,
    }, {
        x: x.max,
        y: y.max,
    }]), [])
);

export const getViewBox = ({
    x: {
        min: xMin = 0,
        max: xMax = 0,
    } = {},
    y: {
        min: yMin = 0,
        max: yMax = 0,
    } = {},
} = {}, padding = 0) => `${
    xMin - padding
    } ${
    yMin + padding
    } ${
    xMax - xMin - padding
    } ${
    yMax - yMin + padding
    }`;
