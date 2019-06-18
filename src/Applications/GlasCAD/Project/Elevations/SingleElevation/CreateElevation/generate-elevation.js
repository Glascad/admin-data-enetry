
export default function generateElevation({
    verticalRoughOpening,
    horizontalRoughOpening,
    startingBayQuantity = 1,
    finishedFloorHeight = 0,
    sightline,
    horizontals,
}) {

    const bayWidth = (horizontalRoughOpening - sightline * (startingBayQuantity + 1)) / startingBayQuantity;

    const lastContainerHeight = horizontals
        .reduce(((height, { distance }) => height - sightline - distance),
            verticalRoughOpening - sightline * 2);

    const containerHeights = horizontals
        .map(({ distance }) => distance)
        .concat(lastContainerHeight);

    // find Number[Symbol.iterator] in public/index.html
    const _elevationContainers = [...startingBayQuantity]
        .reduce((bays, i) => bays
            .concat(containerHeights
                .map((height, j) => ({
                    bay: i,
                    row: j,
                    id: i + 1 + j * startingBayQuantity,
                    original: i === 0 && j === 0,
                    daylightOpening: {
                        x: bayWidth,
                        y: height,
                    },
                }))),
            []);

    const validContainerIds = _elevationContainers.reduce((ids, { id }) => ({ ...ids, [id]: id }), {});

    const _containerDetails = _elevationContainers
        .reduce((all, { id, row, bay }, _, { length }) => all
            .concat([
                // left
                bay === 0 && {
                    vertical: true,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
                // right
                {
                    vertical: true,
                    firstContainerId: id,
                    secondContainerId: bay === startingBayQuantity - 1 ?
                        undefined
                        :
                        id + 1
                },
                // top
                {
                    vertical: false,
                    firstContainerId: id,
                    secondContainerId: validContainerIds[id + startingBayQuantity],
                },
                // bottom
                row === 0 && {
                    vertical: false,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
            ]), [])
        .filter(Boolean)
        .map((detail, i) => ({
            id: i,
            ...detail,
        }));

    return {
        roughOpening: {
            x: horizontalRoughOpening,
            y: verticalRoughOpening,
        },
        finishedFloorHeight,
        _elevationContainers,
        _containerDetails,
    };
}
