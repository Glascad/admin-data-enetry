import { RecursiveElevation } from "./RecursiveElevation";

export default function calculatePlacement(elevation) {

    // const recursiveElevation = recurseElevation(elevation);
    const recursiveElevation = new RecursiveElevation(elevation);

    const {
        placedContainers,
        placedFrames,
    } = recursiveElevation;

    window.temp1 = recursiveElevation;

    console.log({
        recursiveElevation,
    });

    console.log({ placedContainers });

    return {
        ...elevation,
        placedContainers,
        placedFrames,
    };
}
