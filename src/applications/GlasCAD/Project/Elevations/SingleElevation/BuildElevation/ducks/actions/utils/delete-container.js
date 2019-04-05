
export default function deleteContainer({
    elevationInput,
    elevationInput: {
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
        elevationInput: {
            ...elevationInput,
            containers: containers.filter(({ id, fakeId }) => (id || fakeId) !== (containerId || containerFakeId)),
            containerIdsToDelete: containerIdsToDelete.concat(containerId || []),
        },
    };
}
