
export default function mergeElevationInput(
    rawElevation = {},
    elevationInput = {},
) {

    console.log({
        rawElevation,
        elevationInput,
    });

    const {
        roughOpening: {
            x,
            y,
        } = {},
        finishedFloorHeight,
        _containerDetails = [],
        _elevationContainers = [],
        sightline = 10,
    } = rawElevation;

    const {
        containers = [],
        details = [],
        detailIdsToDelete = [],
        containerIdsToDelete = [],
    } = elevationInput;

    const containersToUpdate = containers.filter(({ id }) => id);
    const containersToAdd = containers.filter(({ fakeId }) => fakeId);

    const detailsToUpdate = details.filter(({ id }) => id);
    const detailsToAdd = details.filter(({ fakeId }) => fakeId);

    console.log({
        containersToUpdate,
        containersToAdd,
        detailsToUpdate,
        detailsToAdd,
    });

    return {
        ...rawElevation,
        _elevationContainers: _elevationContainers
            .filter(({ id }) => !containerIdsToDelete.includes(id))
            .map(container => {
                const update = containersToUpdate.find(({ id }) => id === container.id);
                return update ?
                    {
                        ...container,
                        ...update,
                        roughOpening: {
                            ...container.roughOpening,
                            ...update.roughOpening,
                        },
                        __typename: "UPDATED_CONTAINER",
                    }
                    :
                    container;
            })
            .concat(containersToAdd),
        _containerDetails: _containerDetails
            .filter(({ id }) => !detailIdsToDelete.includes(id))
            .map(detail => {
                const update = detailsToUpdate.find(({ id }) => id === detail.id);
                return update ?
                    {
                        ...detail,
                        ...update,
                        __typename: "UPDATED_DETAIL",
                    }
                    :
                    detail;
            })
            .concat(detailsToAdd),
    };
}
