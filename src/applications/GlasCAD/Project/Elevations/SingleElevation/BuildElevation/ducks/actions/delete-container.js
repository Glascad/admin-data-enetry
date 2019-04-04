
export default function DELETE_CONTAINER({
    elevation: elevationInput,
    elevation: {
        containers = [],
    },
}, {
    container: {
        rawContainer,
        rawContainer: {
            id: containerId,
            fakeId: containerFakeId,
        },
    },
}) {

    const previouslyUpdatedContainer = containers.find(({ id, fakeId }) => (id || fakeId) === (containerId || containerFakeId));

    const deletedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        customRoughOpening: true,
    };

    return {
        elevation: {
            ...elevationInput,
            containers: previouslyUpdatedContainer ?
                containers.replace(
                    containers.indexOf(previouslyUpdatedContainer),
                    deletedContainer,
                )
                :
                containers.concat(deletedContainer)
        },
    };
}
