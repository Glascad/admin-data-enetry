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

        console.log("MERGING CONTAINERS");

        console.log({
            elevationInput,
            container,
            rawContainer,
            containerId,
            direction,
            details,
            containers,
            detailsToDelete,
            containerIdsToDelete,
        });

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

        const filteredDetails = details
            .filter(({ id, fakeId }) => !detailIdsToFilter.includes(id || fakeId));
        
        const newDetails = filteredDetails
            .concat(detailsToMerge.map(detail => detail.actions__merge(mergedContainerId, containerId)));

        const filteredContainers = containers
            .filter(({ id, fakeId }) => (id || fakeId) !== mergedContainerId);

        const oldContainer = filteredContainers.find(({ id, fakeId }) => (id || fakeId) === containerId);

        const oldContainerIndex = filteredContainers.indexOf(oldContainer);

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
            mergedContainerId,
            newOriginal,
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
