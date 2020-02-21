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

    const {
        daylightOpening: {
            dimensions: {
                width: updatedWidth,
                height: updatedHeight,
            } = {}
        } = {}
    } = previouslyUpdatedContainer || {};

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        daylightOpening: {
            dimensions: {
                width: vertical ?
                    (updatedWidth || width)
                    :
                    (updatedWidth || width) - distance,
                height: vertical ?
                    (updatedHeight || height) - distance
                    :
                    (updatedHeight || height),
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
