
export default function generatePreview({ allContainers = [] } = {}) {
    const paths = allContainers.reduce((paths, {
        topFrame: { placement: { height: topSL } },
        bottomFrame: { placement: { height: bottomSL } },
        rightFrame: { placement: { width: rightSL } },
        leftFrame: { placement: { width: leftSL } },
        placement: {
            x,
            y,
            height: placementHeight,
            width: placementWidth,
        },
    }) => {

        const ox = x - (0.5 * leftSL);
        const oy = y - (0.5 * bottomSL);
        const origin = [ox, oy];
        const height = placementHeight + (0.5 * topSL) + (0.5 * bottomSL);
        const width = placementWidth + (0.5 * rightSL) + (0.5 * leftSL);

        console.log({ topSL, bottomSL, rightSL, leftSL, x, y, placementHeight, placementWidth, origin, height, width });

        const commands = [
            {
                command: 'M',
                arguments: origin,
            },
            {
                command: 'V',
                arguments: [oy + height],
            },
            {
                command: 'H',
                arguments: [ox + width],
            },
            {
                command: 'V',
                arguments: [oy],
            },
            {
                command: 'Z',
            },
        ];

        return paths.concat({ commands });
    }, []);

    console.log({ paths });

    return paths;
}
