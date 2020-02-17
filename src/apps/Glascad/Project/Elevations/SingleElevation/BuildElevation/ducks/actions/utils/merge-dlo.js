import { replace } from "../../../../../../../../../utils";
import CONTENT_TYPES from "../../../../../../../../../utils/objects/content_types";

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
        contents,
    },
    direction,
    direction: [
        vertical,
        first,
    ],
}) {

    const [mergedContainer] = container.getImmediateContainersByDirection(...direction);
    const {
        id: mergedID,
        rawContainer: {
            daylightOpening: {
                dimensions: {
                    width: DLOToMergeWidth,
                    height: DLOToMergeHeight,
                },
            },
            original: originalToMerge
        },
    } = mergedContainer;

    const { sightline = 0 } = container.getFrameByDirection(...direction) || {};

    const previouslyUpdatedContainer = containers.find(({ id }) => id === containerId);
    const {
        daylightOpening: {
            dimensions: {
                width: mergedUpdatedWidth,
                height: mergedUpdatedHeight,
            } = {},
        } = {},
    } = containers.find(({ id }) => id === mergedID) || {}

    const {
        daylightOpening: {
            dimensions: {
                width: updatedWidth,
                height: updatedHeight,
            } = {},
        } = {},
    } = previouslyUpdatedContainer || {};

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        original: original || originalToMerge,
        daylightOpening: {
            dimensions: {
                width: vertical ?
                    (updatedWidth || width)
                    :
                    (updatedWidth || width) + sightline + (mergedUpdatedWidth || DLOToMergeWidth),
                height: vertical ?
                    (updatedHeight || height) + sightline + (mergedUpdatedHeight || DLOToMergeHeight)
                    :
                    (updatedHeight || height),
            }
        },
        contents: contents === CONTENT_TYPES.VOID_INTERNAL ? mergedContainer.getNewContentsType() : contents,
    };
    console.log({ containerId, elevationInput, updatedWidth, updatedHeight, container, updatedContainer, sightline })

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
