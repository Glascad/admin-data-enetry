
export default function deleteContainer({
    elevation: elevationInput,
    elevation: {
        containers = [],
        containerIdsToDelete = [],
    },
}, {
    container: {
        rawContainer: {
            id: containerId,
            fakeId: containerFakeId,
        },
    },
}) {
    return {
        elevation: {
            ...elevationInput,
            containers: containers.filter(({ id, fakeId }) => (id || fakeId) !== (containerId || containerFakeId)),
            containerIdsToDelete: containerIdsToDelete.concat(containerId || []),
        },
    };
}
