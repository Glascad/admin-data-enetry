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


export const getAlignmentCoordinates = (vertical, start, selectedItem = {}, transform = {}) => {

    const {
        _part: {
            paths = [],
        } = {},
    } = selectedItem;

    const {
        x: {
            min: xMin,
            max: xMax,
        } = {},
        y: {
            min: yMin,
            max: yMax,
        } = {},
    } = getViewBox(paths);

    /** cos0, -sin0, transX  ===> acos0, asin(-1 * 0)
     *  sin0, cos0,  transY  ===> asin0, acos0
     */

    const {
        a, b, c: xOffset = 0,
        d, e, f: yOffset = 0,
        g, h, i,
    } = transform;


    const transformOffset = vertical ? yOffset : xOffset;
    const initialPoint = vertical ?
        start ? yMin : yMax
        :
        start ? xMin : xMax;

    console.log({
        vertical,
        start,
        selectedItem,
        paths,
        transform,
        viewBox: getViewBox(paths),
        transformOffset,
        initialPoint,
    })

    return initialPoint + transformOffset;
};

export const getAlignTop = (selectedItem, transform) => getAlignmentCoordinates(true, false, selectedItem, transform);
export const getAlignBottom = (selectedItem, transform) => getAlignmentCoordinates(true, true, selectedItem, transform);
export const getAlignLeft = (selectedItem, transform) => getAlignmentCoordinates(false, true, selectedItem, transform);
export const getAlignRight = (selectedItem, transform) => getAlignmentCoordinates(false, false, selectedItem, transform);