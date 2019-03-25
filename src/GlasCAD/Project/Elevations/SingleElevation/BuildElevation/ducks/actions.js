import _ from 'lodash';

const _getFakeId = (() => {
    var fakeId = 1;
    return () => fakeId++;
})();

const convertFakeIdToNumber = fakeId => typeof fakeId === 'number' ?
    fakeId
    :
    Number(fakeId.replace('_', ''));

export default {
    MERGE_CONTAINERS({
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
            rawContainer,
            id: containerId,
        },
        direction,
    }) {

        const {
            mergedContainer: {
                id: mergedContainerId,
            },
            newOriginal,
            newDaylightOpening,
            detailsToMerge,
            detailsToDelete,
        } = container.actions__merge(...direction);

        const [
            newDetailIdsToDelete,
            detailIdsToFilter,
        ] = _.partition(detailsToDelete, ({ id }) => typeof id === 'number')
            .map(details => details.map(({ id }) => id));

        const newDetails = details
            .filter(({ id, fakeId }) => !detailIdsToFilter.includes(id || fakeId))
            .concat(detailsToMerge.map(detail => detail.actions__merge(mergedContainerId, containerId)));

        const oldContainer = containers.find(({ id, fakeId }) => (id || fakeId) === containerId);

        const oldContainerIndex = containers.indexOf(oldContainer);

        const filteredContainers = containers
            .filter(({ id, fakeId }) => (id || fakeId) === mergedContainerId);

        const updatedContainer = {
            ...oldContainer,
            ...rawContainer,
            daylightOpening: newDaylightOpening,
            original: newOriginal,
        };

        const newContainers = oldContainer ?
            filteredContainers.replace(oldContainerIndex, updatedContainer)
            :
            filteredContainers.concat(updatedContainer);

        console.log({
            details,
            containers,
            mergedContainerId,
            newDaylightOpening,
            detailsToMerge,
            detailsToDelete,
            newDetailIdsToDelete,
            detailIdsToFilter,
            newDetails,
            oldContainer,
            oldContainerIndex,
            filteredContainers,
            updatedContainer,
            newContainers,
        });

        return {
            elevation: {
                ...elevationInput,
                details: newDetails,
                containers: newContainers,
                detailIdsToDelete: detailIdsToDelete.concat(newDetailIdsToDelete),
                containerIdsToDelete: containerIdsToDelete.concat(typeof mergedContainerId === 'number' ?
                    mergedContainerId
                    :
                    []),
            },
        };
    },
}
