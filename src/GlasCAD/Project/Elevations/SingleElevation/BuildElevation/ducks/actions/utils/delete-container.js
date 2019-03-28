
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
    const log = (a, b) => { console.log(a, b); return a; }

    return log({
        elevation: {
            ...elevationInput,
            containers: containers.filter(({ id, fakeId }) => (id || fakeId) !== (containerId || containerFakeId)),
            containerIdsToDelete: containerIdsToDelete.concat(containerId || []),
        },
    }, arguments);
}
