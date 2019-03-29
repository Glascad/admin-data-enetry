
export const defaultDetailUpdate = {
    id: 0,
    vertical: false,
    firstContainerId: 0,
    secondContainerId: 0,
    firstContainerFakeId: 0,
    secondContainerFakeId: 0,
};

export const defaultContainerUpdate = {
    id: 0,
    fakeId: 0,
    original: false,
    contents: "",
    daylightOpening: {
        x: 0,
        y: 0,
    },
    bottomLeftOffset: {
        x: 0,
        y: 0,
    },
};

export default {
    elevation: {
        id: 0,
        name: "",
        roughOpening: {
            x: 0,
            y: 0,
        },
        finishedFloorHeight: 0,
        details: [],
        containers: [],
        detailIdsToDelete: [],
        containerIdsToDelete: [],
    },
};