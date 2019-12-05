import match from "./match";
import { Matrix } from "..";

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
    const xValues = coordinates.map(({ x }) => x || 0);
    const yValues = coordinates.map(({ y }) => y || 0);
    // console.log({ coordinates, xValues, yValues });
    return {
        x: {
            min: (Math.min(...xValues) || 0) - padding,
            max: (Math.max(...xValues) || 0) + padding,
        },
        y: {
            min: (Math.min(...yValues) || 0) - padding,
            max: (Math.max(...yValues) || 0) + padding,
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


export const getAlignmentCoordinates = window.getAlignmentCoordinates = (vertical, start, selectedItem = {}) => {

    const {
        _part: {
            paths = [],
        } = {},
        transform = {},
    } = selectedItem;

    return paths.reduce((furthestPoint, { commands }) => {
        const transformKey = vertical ? 'y' : 'x';
        const furthestCommand = commands.reduce((furthestCommand, { arguments: commandArguments = [] }) => {
            if (commandArguments.length < 2) return furthestCommand;
            const x = commandArguments[commandArguments.length - 2];
            const y = commandArguments[commandArguments.length - 1];
            const transformMatrix = new Matrix(transform);
            const transformedPoint = transformMatrix.transformCoordinate(x, y);
            if (!furthestCommand) return transformedPoint;
            const commandDifference = transformedPoint[transformKey] - furthestCommand[transformKey];

            return (
                start ?
                    commandDifference < 0
                    :
                    commandDifference > 0
            ) ?
                transformedPoint
                :
                furthestCommand;
        }, undefined);
        if (!furthestPoint) return furthestCommand;
        const pointDifference = furthestCommand[transformKey] - furthestPoint[transformKey]
        return (
            start ?
                pointDifference < 0
                :
                pointDifference > 0
        ) ?
            furthestCommand
            :
            furthestPoint
    }, undefined);
};

export const getAlignCenterCoordinates = window.getAlignCenterCoordinates = (vertical, selectedItem) => {
    const {
        x: closeX,
        y: closeY,
    } = getAlignmentCoordinates(vertical, true, selectedItem);
    const {
        x: farX,
        y: farY,
    } = getAlignmentCoordinates(vertical, false, selectedItem);

    return {
        x: (farX + closeX) / 2,
        y: (farY + closeY) / 2,
    };
}

export const getAlignTopCoordinates = window.getAlignTopCoordinates = selectedItem => getAlignmentCoordinates(true, false, selectedItem);
export const getAlignBottomCoordinates = window.getAlignBottomCoordinates = selectedItem => getAlignmentCoordinates(true, true, selectedItem);
export const getAlignLeftCoordinates = window.getAlignLeftCoordinates = selectedItem => getAlignmentCoordinates(false, true, selectedItem);
export const getAlignRightCoordinates = window.getAlignRightCoordinates = selectedItem => getAlignmentCoordinates(false, false, selectedItem);
export const getAlignVCenterCoordinates = window.getAlignVCenterCoordinates = selectedItem => getAlignCenterCoordinates(true, selectedItem);
export const getAlignHCenterCoordinates = window.getAlignHCenterCoordinates = selectedItem => getAlignCenterCoordinates(false, selectedItem);