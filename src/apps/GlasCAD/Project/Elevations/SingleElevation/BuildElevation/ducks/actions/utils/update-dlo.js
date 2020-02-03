import { replace } from "../../../../../../../../../utils";

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
            daylightOpening: {
                dimensions: {
                    width,
                    height,
                }
            },
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
            dimensions: {
                width: vertical ?
                    width
                    :
                    width - distance,
                height: vertical ?
                    height - distance
                    :
                    height,
            }
        },
    };

    // console.log(`UPDATING DLO OF CONTAINER: ${containerId}`);
    // console.log({ container, containerId, vertical, distance, updatedContainer, rawContainer });

    return {
        elevationInput: {
            ...elevationInput,
            containers: previouslyUpdatedContainer ?
                replace(containers,
                    containers.indexOf(previouslyUpdatedContainer),
                    updatedContainer,
                )
                :
                containers.concat(updatedContainer),
        },
    };
}
