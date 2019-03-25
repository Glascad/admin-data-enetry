
const _getFakeId = (() => {
    var fakeId = 1;
    return () => fakeId++;
})();

export default {
    MERGE_CONTAINERS({
        _elevation: rawElevation,
        _elevation: {
            _elevationContainers,
            _containerDetails,
        },
    }, {
        elevation: elevationInput,
        elevation: {
            details = [],
            containers = [],
            detailIdsToDelete = [],
            containerIdsToDelete = [],
        },
    }, {
        container,
        container: {
            elevation: recursiveElevation,
            daylightOpening: {
                x,
                y,
            },
        },
        direction,
        direction: [
            vertical,
            first,
        ],
    }) {
        const [otherContainer] = container._getImmediateContainersByDirection(...direction);

        const { sightline } = container._getFrameByDirection(...direction);

        const [detailToDelete] = container._getDetailsByDirection(...direction);

        const convertFakeIdToNumber = fakeId => typeof fakeId === 'number' ?
            fakeId
            :
            Number(fakeId.replace('_', ''));

        const containerIds = [container.id, otherContainer.id].map(convertFakeIdToNumber);

        // delete both containers
        // add them both to containeridstodelete
        const newContainerIdsToDelete = containerIdsToDelete
            .concat(containerIds
                .filter(id => typeof id === 'number'));

        // create new container
        // give new container correct daylight opening
        const newContainer = {
            fakeId: _getFakeId(),
            daylightOpening: {
                x: vertical ?
                    x
                    :
                    x + sightline + otherContainer.daylightOpening.x,
                y: vertical ?
                    y + sightline + otherContainer.daylightOpening.y
                    :
                    y,
            },
        };

        const newContainers = containers
            // or simply remove from elevationinput.containers if id is fake
            .filter(({ id, fakeId }) => (
                !containerIds.includes(id)
                &&
                !containerIds.includes(fakeId)))
            .concat(newContainer);

        // remove detail between merged containers
        const newDetailIdsToDelete = detailIdsToDelete
            .concat([detailToDelete.id]
                .filter(id => typeof id === 'number'));

        // update all details pointing at previous containers to point to new container
        const updatedDetails = details
            // or simply remove from elevationinput.details if id is fake
            .filter(({ id, fakeId }) => (
                id !== detailToDelete.id
                &&
                fakeId !== detailToDelete.id
            ))
            .map(detail => {
                const {
                    firstContainerId,
                    firstContainerFakeId,
                    secondContainerId,
                    secondContainerFakeId,
                } = detail;

                const newFirstContainerFakeId = [firstContainerId, firstContainerFakeId]
                    .some(id => containerIds.includes(id))
                    &&
                    newContainer.fakeId;

                const newSecondContainerFakeId = [secondContainerId, secondContainerFakeId]
                    .some(id => containerIds.includes(id))
                    &&
                    newContainer.fakeId;

                if (newFirstContainerFakeId) {
                    return {
                        ...detail,
                        firstContainerId: undefined,
                        firstContainerFakeId: newFirstContainerFakeId,
                    };
                } else if (newSecondContainerFakeId) {
                    return {
                        ...detail,
                        secondContainerId: undefined,
                        secondContainerFakeId: newSecondContainerFakeId,
                    };
                } else {
                    return detail;
                }
            });

        const newDetails = updatedDetails
            .concat(_containerDetails
                .filter(({
                    id,
                    fakeId,
                    firstContainerId,
                    firstContainerFakeId,
                    secondContainerId,
                    secondContainerFakeId,
                }) => (
                    id !== detailToDelete.id
                    &&
                    fakeId !== detailToDelete.id
                ) && (
                        [
                            firstContainerId,
                            firstContainerFakeId,
                            secondContainerId,
                            secondContainerFakeId
                        ].some(id => containerIds.includes(id))
                    ))
                .map(detail => {
                    const {
                        firstContainerId,
                        firstContainerFakeId,
                        secondContainerId,
                        secondContainerFakeId,
                    } = detail;

                    const newFirstContainerFakeId = [firstContainerId, firstContainerFakeId]
                        .some(id => containerIds.includes(id))
                        &&
                        newContainer.fakeId;

                    const newSecondContainerFakeId = [secondContainerId, secondContainerFakeId]
                        .some(id => containerIds.includes(id))
                        &&
                        newContainer.fakeId;

                    console.log({
                        containerIds,
                        firstContainerId,
                        firstContainerFakeId,
                        secondContainerId,
                        secondContainerFakeId,
                        newFirstContainerFakeId,
                        newSecondContainerFakeId,
                    });

                    if (newFirstContainerFakeId) {
                        return {
                            ...detail,
                            firstContainerId: undefined,
                            firstContainerFakeId: newFirstContainerFakeId,
                        };
                    } else if (newSecondContainerFakeId) {
                        return {
                            ...detail,
                            secondContainerId: undefined,
                            secondContainerFakeId: newSecondContainerFakeId,
                        };
                    } else {
                        return detail;
                    }
                }));

        console.log({
            newContainer,
            newContainerIdsToDelete,
            updatedDetails,
            newDetails,
            newDetailIdsToDelete,
        });

        return {
            elevation: {
                ...elevationInput,
                details: newDetails,
                containers: newContainers,
                detailIdsToDelete: newDetailIdsToDelete,
                containerIdsToDelete: newContainerIdsToDelete,
            },
        };
    },
}
