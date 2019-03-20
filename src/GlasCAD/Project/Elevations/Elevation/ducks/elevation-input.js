
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
    distance: 150,
    from: measureFromOptions[0].value,
    to: measureToOptions[0].value,
};

export const defaultElevationInput = {
    verticalLock: true,
    horizontalLock: true,
    verticalRoughOpening: 400,
    horizontalRoughOpening: 600,
    startingBayQuantity: 3,
    finishedFloorHeight: 50,
    sightline: 10,
    horizontals: [defaultHorizontal],
};
