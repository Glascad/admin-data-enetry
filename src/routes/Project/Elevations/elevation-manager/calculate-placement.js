import { RecursiveElevation } from "./recurse-elevation";

export default function calculatePlacement(elevation) {

    // const recursiveElevation = recurseElevation(elevation);
    const recursiveElevation = new RecursiveElevation(elevation);

    window.temp1 = recursiveElevation;

    const originalContainer = Object.values(recursiveElevation)
        .find(({ original }) => original);

    console.log({
        recursiveElevation,
        originalContainer,
    });

    return elevation;

    // return {
    //     ...elevation,
    //     // placedContainers: _elevationContainers
    //     //     .map(({
    //     //         daylightOpening: {
    //     //             x,
    //     //             y,
    //     //         },
    //     //     }) => ({
    //     //         x: sightline,
    //     //         y: sightline,
    //     //         height: y,
    //     //         width: x,
    //     //     })),
    //     // placedFrames: _elevationContainers
    //     //     .reduce((frames, {
    //     //         firstContainerDetails,
    //     //         secondContainerDetails,
    //     //     }) => frames.concat([

    //     //     ]), []),
    // };
}
