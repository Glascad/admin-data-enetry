
export default function createElevation({
    verticalRoughOpening,
    horizontalRoughOpening,
    startingBayQuantity = 1,
    finishedFloorHeight = 0,
    sightline,
}) {

    const _elevationContainers = [...startingBayQuantity]
        .map(i => ({
            id: i + 1,
            original: i === 0,
            contents: "GLASS",
            daylightOpening: {
                x: (horizontalRoughOpening - sightline * (startingBayQuantity + 1)) / startingBayQuantity,
                y: verticalRoughOpening - sightline * 2,
            }
        }));

    const _containerDetails = _elevationContainers
        .reduce((all, { id }, i, { length }) => all.concat([
            // left
            {
                vertical: true,
                firstContainerId: i === 0 ?
                    undefined
                    :
                    id - 1,
                secondContainerId: id,
            },
            // right
            {
                vertical: true,
                firstContainerId: id,
                secondContainerId: i === length - 1 ?
                    undefined
                    :
                    id + 1
            },
            // top
            {
                vertical: false,
                firstContainerId: id,
                secondContainerId: undefined,
            },
            // bottom
            {
                vertical: false,
                firstContainerId: undefined,
                secondContainerId: id,
            },
        ]), []);

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
