import { ImperialValue } from "../../../../../../utils";

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
    distance: new ImperialValue("3'"),
    from: measureFromOptions[0].value,
    to: measureToOptions[0].value,
};

export const defaultElevationInput = {
    verticalLock: true,
    horizontalLock: true,
    verticalRoughOpening: new ImperialValue("8'"),
    horizontalRoughOpening: new ImperialValue("4'"),
    verticalMasonryOpening: true,
    horizontalMasonryOpening: true,
    startingBayQuantity: 1,
    finishedFloorHeight: new ImperialValue(0),
    sightline: new ImperialValue(2),
    horizontals: [defaultHorizontal],
};
