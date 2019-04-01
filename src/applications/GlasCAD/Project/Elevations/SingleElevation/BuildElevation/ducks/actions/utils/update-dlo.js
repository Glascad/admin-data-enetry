
export default function updateDLO({
    elevation: elevationInput,
    elevation: {
        containers = [],
    },
}, {
    container,
    container: {
        rawContainer,
        rawContainer: {
            id: containerId,
            fakeId: containerFakeId,
            daylightOpening: DLO,
        },
    },
    vertical,
    distance,
}) {

    const previouslyUpdatedContainer = containers.find(({ id, fakeId }) => (id || fakeId) === (containerId || containerFakeId));

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        daylightOpening: {
            x: vertical ?
                DLO.x
                :
                DLO.x - distance,
            y: vertical ?
                DLO.y - distance
                :
                DLO.y,
        },
    };

    return {
        elevation: {
            ...elevationInput,
            containers: previouslyUpdatedContainer ?
                containers.replace(
                    containers.indexOf(previouslyUpdatedContainer),
                    updatedContainer,
                )
                :
                containers.concat(updatedContainer),
        },
    };
}
