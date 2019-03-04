
export default function createElevation({
    verticalRoughOpening,
    horizontalRoughOpening,
    startingBayQuantity = 1,
    finishedFloorHeight = 0,
    sightline,
}) {

    const _elevationContainers = [...startingBayQuantity]
        .map(i => ({
            fakeId: i + 1,
            original: i === 0,
            contents: "GLASS",
            daylightOpening: {
                x: (horizontalRoughOpening - sightline * (startingBayQuantity + 1)) / startingBayQuantity,
                y: verticalRoughOpening - sightline * 2,
            }
        }));
    
    const getFakeDetailId = (() => {
        var id = 1;
        return () => id++;
    })();

    const _containerDetails = _elevationContainers
        .reduce((all, { fakeId }, i, { length }) => all.concat([
            // left
            i === 0 && {
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
                secondContainerFakeId: i === length - 1 ?
                undefined
                :
                fakeId + 1
            },
            // top
            {
                fakeId: getFakeDetailId(),
                vertical: false,
                firstContainerFakeId: fakeId,
                secondContainerFakeId: undefined,
            },
            // bottom
            {
                fakeId: getFakeDetailId(),
                vertical: false,
                firstContainerFakeId: undefined,
                secondContainerFakeId: fakeId,
            },
        ].filter(Boolean)), []);

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
