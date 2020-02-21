
export const defaultDetailUpdate = {
    id: 0,
    vertical: false,
    firstContainerId: 0,
    secondContainerId: 0,
};

export const defaultContainerUpdate = {
    id: 0,
    original: false,
    contents: "",
    daylightOpening: {
        dimensions: {
            width: 0,
            height: 0,
        }
    },
};

export default {
    id: 0,
    name: "",
    roughOpening: {
        width: 0,
        height: 0,
    },
    finishedFloorHeight: 0,
    details: [],
    containers: [],
    detailIdsToDelete: [],
    containerIdsToDelete: [],
};