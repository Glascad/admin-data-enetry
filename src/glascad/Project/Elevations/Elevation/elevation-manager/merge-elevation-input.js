
// const getFakeNodeId=

export default function mergeElevationInput({
    rawElevation,
    rawElevation: {
        roughOpening: {
            x,
            y,
        } = {},
        finishedFloorHeight,
        _containerDetails = [],
        _elevationContainers = [],
        sightline = 10,
    } = {},
}, {
    elevationInput,
    elevationInput: {
        verticalLock,
        horizontalLock,
        verticalRoughOpening,
        horizontalRoughOpening,
        startingBayQuantity,
        finishedFloorHeight: updatedFinishedFloorHeight,
    },
}) {

    const getFakeId = () => `${1 +
        _elevationContainers
            .reduce((max, { id }) => Math.max(max, id), 0)
        }`;

    console.log(arguments);

    // update direct keys

    const newFinishedFloorHeight = updatedFinishedFloorHeight === undefined ?
        finishedFloorHeight
        :
        updatedFinishedFloorHeight;

    const newRoughOpening = {
        x: horizontalRoughOpening === undefined ?
            x
            :
            horizontalRoughOpening,
        y: verticalRoughOpening === undefined ?
            y
            :
            verticalRoughOpening,
    };

    const baseUpdate = {
        ...rawElevation,
        roughOpening: newRoughOpening,
        finishedFloorHeight: newFinishedFloorHeight,
    };

    // update bay quantity

    const groundContainers = _elevationContainers
        .filter(({ id }) => _containerDetails
            .some(({
                firstContainerId,
                secondContainerId,
                vertical,
            }) => !vertical
            &&
            firstContainerId === undefined
                &&
                secondContainerId === id)
        );

    // has BQ changed ?
    // add/remove containers to match BQ
    if (newRoughOpening.x === x) {
        if (startingBayQuantity > groundContainers.length) {
            // add container
            const fakeId = getFakeId();
            const newElevationContainers = _elevationContainers.concat({
                id: fakeId,
                contents: "GLASS",
                daylightOpening: {
                    x: (x - sightline * (startingBayQuantity + 1)) / startingBayQuantity,
                    y: y - sightline * 2,
                },
                original: false,
            });
            const detailToUpdate = _containerDetails
                .find(({
                    firstContainerId,
                    secondContainerId,
                    vertical,
                }) => vertical
                &&
                !secondContainerId
                    &&
                    groundContainers
                        .some(({ id }) => id === firstContainerId)
                );
            const detailIndex = _containerDetails.indexOf(detailToUpdate);
            const newContainerDetails = _containerDetails
                .replace(detailIndex, {
                    ...detailToUpdate,
                    secondContainerId: fakeId,
                })
                .concat([
                    {
                        firstContainerId: fakeId,
                        vertical: true,
                    },
                    {
                        secondContainerId: fakeId,
                        vertical: false,
                    }
                ]);
            return {
                ...baseUpdate,
                roughOpening: {
                    ...newRoughOpening,
                    x: newRoughOpening.x + 360,
                },
                _elevationContainers: newElevationContainers,
                _containerDetails: newContainerDetails,
            };
        } else if (startingBayQuantity < groundContainers.length) {
            // remove container
            return {
                ...baseUpdate,
            };
        } else {
            return baseUpdate;
        }
    } else {
        // is RO locked ?
        // calculate new RO or new DLO based on RO lock
        return baseUpdate;
    }
}
