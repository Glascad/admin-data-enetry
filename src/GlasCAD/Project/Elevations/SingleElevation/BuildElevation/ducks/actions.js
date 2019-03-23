
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
        },
        direction,
    }) {
        const [otherContainer] = container._getImmediateContainersByDirection(...direction);

        // delete both containers
        // add them both to containeridstodelete
        // or simply remove from elevationinput.containers if id is fake

        // create new container
        // give new container correct daylight opening

        // update all details pointing at previous containers to point to new container
    },
}
