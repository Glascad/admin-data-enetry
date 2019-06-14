
export default function updateDLO({
    elevationInput,
    elevationInput: {
        containers = [],
    },
}, {
    container,
    container: {
        rawContainer,
        rawContainer: {
            id: containerId,
            daylightOpening: DLO,
        },
    },
    vertical,
    distance,
}) {
    const previouslyUpdatedContainer = containers.find(({ id }) => id === containerId);

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

    // console.log(`UPDATING DLO OF CONTAINER: ${containerId}`);
    // console.log({ container, containerId, vertical, distance, updatedContainer, rawContainer });

    return {
        elevationInput: {
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
