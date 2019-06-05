
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
        },
    },
}) {
    return {
        elevationInput: {
            ...elevationInput,
            containers: containers.filter(({ id }) => id !== containerId),
            containerIdsToDelete: containerIdsToDelete.concat(containerId || []),
        },
    };
}
