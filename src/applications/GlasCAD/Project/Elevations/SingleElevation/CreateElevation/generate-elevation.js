
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
                    fakeId: i + 1 + j * startingBayQuantity,
                    original: i === 0 && j === 0,
                    daylightOpening: {
                        x: bayWidth,
                        y: height,
                    },
                }))),
            []);

    const validContainerIds = _elevationContainers.reduce((ids, { fakeId }) => ({ ...ids, [fakeId]: fakeId }), {});

    const getFakeDetailId = (() => {
        var id = 1;
        return () => id++;
    })();

    const _containerDetails = _elevationContainers
        .reduce((all, { fakeId, row, bay }, _, { length }) => all
            .concat([
                // left
                bay === 0 && {
                    fakeId: getFakeDetailId(),
                    vertical: true,
                    firstContainerFakeId: undefined,
                    secondContainerFakeId: fakeId,
                },
                // right
                {
                    fakeId: getFakeDetailId(),
                    vertical: true,
                    firstContainerFakeId: fakeId,
                    secondContainerFakeId: bay === startingBayQuantity - 1 ?
                        undefined
                        :
                        fakeId + 1
                },
                // top
                {
                    fakeId: getFakeDetailId(),
                    vertical: false,
                    firstContainerFakeId: fakeId,
                    secondContainerFakeId: validContainerIds[fakeId + startingBayQuantity],
                },
                // bottom
                row === 0 && {
                    fakeId: getFakeDetailId(),
                    vertical: false,
                    firstContainerFakeId: undefined,
                    secondContainerFakeId: fakeId,
                },
            ]
                .filter(Boolean)), []);

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
