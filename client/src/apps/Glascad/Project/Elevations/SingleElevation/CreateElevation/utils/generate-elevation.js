import _ from 'lodash';
import { defaultElevationInput } from "./elevation-input";

export default function generateElevation({
    systemSetId,
    verticalRoughOpening = defaultElevationInput.verticalRoughOpening,
    horizontalRoughOpening = defaultElevationInput.horizontalRoughOpening,
    startingBayQuantity = defaultElevationInput.startingBayQuantity,
    finishedFloorHeight = defaultElevationInput.finishedFloorHeight,
    horizontals = defaultElevationInput.horizontals,
} = defaultElevationInput,
    {
        _systemSets = []
    } = {},
) {

    console.log(arguments);

    const {
        _system: {
            sightline,
        } = {}
    } = _systemSets.find(({ id }) => id === systemSetId) || {};

    const bayWidth = (horizontalRoughOpening - sightline * (startingBayQuantity + 1)) / startingBayQuantity;

    console.log({
        bayWidth,
        horizontalRoughOpening,
        sightline,
        startingBayQuantity,
    })

    const lastContainerHeight = horizontals
        .reduce(((height, { distance }) => height - sightline - distance),
            verticalRoughOpening - sightline * 2);

    const containerHeights = horizontals
        .map(({ distance }) => distance)
        .concat(lastContainerHeight);

    const _elevationContainers = _.range(startingBayQuantity)
        .reduce((bays, i) => bays
            .concat(containerHeights
                .map((height, j) => ({
                    bay: i,
                    row: j,
                    id: i + 1 + j * startingBayQuantity,
                    original: i === 0 && j === 0,
                    daylightOpening: {
                        dimensions: {
                            width: bayWidth,
                            height,
                        },
                        origin: {
                            x: (bayWidth * i) + sightline * (i + 1),
                            y: containerHeights.reduce((totalHeight, containerHeight, k) => k < j ?
                                totalHeight + containerHeight
                                :
                                totalHeight, 0) + sightline * (j + 1),
                        }
                    },
                }))),
            []);

    const validContainerIds = _elevationContainers.reduce((ids, { id }) => ({ ...ids, [id]: id }), {});

    const _containerDetails = _elevationContainers
        .reduce((all, { id, row, bay }, _, { length }) => all
            .concat([
                // left
                bay === 0 && {
                    vertical: true,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
                // right
                {
                    vertical: true,
                    firstContainerId: id,
                    secondContainerId: bay === startingBayQuantity - 1 ?
                        undefined
                        :
                        id + 1
                },
                // top
                {
                    vertical: false,
                    firstContainerId: id,
                    secondContainerId: validContainerIds[id + startingBayQuantity],
                },
                // bottom
                row === 0 && {
                    vertical: false,
                    firstContainerId: undefined,
                    secondContainerId: id,
                },
            ]), [])
        .filter(Boolean)
        .map((detail, i) => ({
            id: i,
            ...detail,
        }));

    return {
        roughOpening: {
            width: horizontalRoughOpening,
            height: verticalRoughOpening,
        },
        finishedFloorHeight,
        _elevationContainers,
        _containerDetails,
    };
}
