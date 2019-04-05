
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
            fakeId: containerFakeId,
            daylightOpening: DLO,
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

    const previouslyUpdatedContainer = containers.find(({ id, fakeId }) => (id || fakeId) === (containerId || containerFakeId));

    const updatedContainer = {
        ...rawContainer,
        ...previouslyUpdatedContainer,
        original: original || originalToMerge,
        daylightOpening: {
            x: vertical ?
                DLO.x
                :
                DLO.x + sightline + DLOToMerge.x,
            y: vertical ?
                DLO.y + sightline + DLOToMerge.y
                :
                DLO.y,
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
