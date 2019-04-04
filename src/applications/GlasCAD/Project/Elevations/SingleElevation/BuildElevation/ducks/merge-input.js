
export default function mergeElevationInput(
    rawElevation = {},
    elevationInput = {},
) {

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

    // const log = obj => {
    //     const recurse = (o, prev = []) => Object.entries(o)
    //         .forEach(([key, value]) => {
    //             if (key === '__typename' && value === value.toUpperCase()) console.log(o);
    //             if (value && !prev.includes(value)) recurse(value, prev.concat([value]));
    //         });
    //     recurse(obj);
    //     return obj;
    // }

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
                        daylightOpening: {
                            ...container.daylightOpening,
                            ...update.daylightOpening,
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
