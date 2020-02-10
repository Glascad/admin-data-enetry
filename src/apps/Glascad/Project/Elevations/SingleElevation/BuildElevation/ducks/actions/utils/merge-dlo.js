import { replace } from "../../../../../../../../../utils";

export default function mergeDLO({
    elevationInput,
    elevationInput: {
        containers = [],
    },
}, {
    container,
    container: {
        elevation,
        rawContainer,
        rawContainer: {
            id: containerId,
            daylightOpening: {
                dimensions: {
                    width,
                    height,
                },
            },
            original,
        },
    },
    direction,
    direction: [
        vertical,
        first,
    ],
}) {

    const [
        {
            rawContainer: {
                daylightOpening: DLOToMerge,
                original: originalToMerge
            },
        },
    ] = container.getImmediateContainersByDirection(...direction);

    const { sightline } = container.getFrameByDirection(...direction) || elevation;

    const previouslyUpdatedContainer = containers.find(({ id }) => id === containerId);

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        original: original || originalToMerge,
        daylightOpening: {
            dimensions: {
                width: vertical ?
                    width
                    :
                    width + sightline + DLOToMerge.dimensions.width,
                height: vertical ?
                    height + sightline + DLOToMerge.dimensions.height
                    :
                    height,
            }
        },
    };

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
