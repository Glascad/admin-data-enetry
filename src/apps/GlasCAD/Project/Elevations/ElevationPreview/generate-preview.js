export default function generatePreview({
    allContainers = [],
} = {}) {
    console.log(arguments)
    console.log({ allContainers })
    const paths = allContainers.reduce((
        paths,
        {
            topFrame: { placement: { height: topSL } },
            bottomFrame: { placement: { height: bottomSL } },
            rightFrame: { placement: { width: rightSL } },
            leftFrame: { placement: { width: leftSL } },
            placement: {
                x,
                y,
                height: placementHeight,
                width: placementWidth,
            }
        }
    ) => {

        const origin = [x - (0.5 * leftSL), y - (0.5 * bottomSL)];
        const height = placementHeight + (0.5 * topSL) + (0.5 * bottomSL);
        const width = placementWidth + (0.5 * rightSL) + (0.5 * leftSL);

        const commands = {
            commands: [
                {
                    command: 'M',
                    arguments: origin,
                },
                {
                    command: 'v',
                    arguments: [height],
                },
                {
                    command: 'h',
                    arguments: [width],
                },
                {
                    command: 'v',
                    arguments: [-height],
                },
                {
                    command: 'Z'
                }
            ]
        };

        return paths.concat(commands)
    }, []);
    console.log({ paths });
    return paths;
}