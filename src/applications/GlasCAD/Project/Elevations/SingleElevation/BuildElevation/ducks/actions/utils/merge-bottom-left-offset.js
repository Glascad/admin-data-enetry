
export default function mergeBottomLeftOffset({
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
            fakeId: containerFakeId,
            bottomLeftOffset: BLO = {},
            original,
        },
    },
    direction,
    direction: [
        vertical,
        first,
    ],
}) {

    return arguments[0];

    const [
        {
            rawContainer: {
                id: idToMerge,
                fakeId: fakeIdToMerge,
                bottomLeftOffset: BLOToMerge = {},
                original: originalToMerge
            },
        },
    ] = container.getImmediateContainersByDirection(...direction);

    const previouslyUpdatedContainer = containers.find(({ id, fakeId }) => (id || fakeId) === (containerId || containerFakeId));

    const previouslyUpdatedContainerToMerge = containers.find(({ id, fakeId }) => (id || fakeId) === (idToMerge || fakeIdToMerge));

    const {
        bottomLeftOffset: updatedBLO = {},
    } = previouslyUpdatedContainer || {};

    const {
        bottomLeftOffset: updatedBLOToMerge = {},
    } = previouslyUpdatedContainerToMerge || {};

    const x = updatedBLOToMerge.x !== undefined ?
        updatedBLOToMerge.x
        :
        updatedBLO.x !== undefined ?
            updatedBLO.x
            :
            BLOToMerge.x !== undefined ?
                BLOToMerge.x
                :
                BLO.x !== undefined ?
                    BLO.x
                    :
                    undefined;

    const y = updatedBLOToMerge.y !== undefined ?
        updatedBLOToMerge.y
        :
        updatedBLO.y !== undefined ?
            updatedBLO.y
            :
            BLOToMerge.y !== undefined ?
                BLOToMerge.y
                :
                BLO.y !== undefined ?
                    BLO.y
                    :
                    undefined;

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        original: original || originalToMerge,
        bottomLeftOffset: {
            x,
            y,
        },
    };

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
