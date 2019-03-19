
export const measureFromOptions = [
    // "Rough Opening (Bottom)",
    "Previous Horizontal (Top)",
    // "Previous Horizontal (Bottom)",
].map(label => ({
    label,
    value: label,
}));

export const measureToOptions = [
    // "Horizontal (Top)",
    "Horizontal (Bottom)",
].map(label => ({
    label,
    value: label,
}));

export const defaultHorizontal = {
    distance: 100,
    from: measureFromOptions[0].value,
    to: measureToOptions[0].value,
};

export const defaultElevationInput = {
    verticalLock: true,
    horizontalLock: true,
    verticalRoughOpening: 300,
    horizontalRoughOpening: 500,
    startingBayQuantity: 2,
    finishedFloorHeight: 50,
    sightline: 10,
    horizontals: [defaultHorizontal],
};
