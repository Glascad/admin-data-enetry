import { RecursiveElevation } from "./RecursiveElevation";

export default function calculatePlacement(elevation) {

    // const recursiveElevation = recurseElevation(elevation);
    const recursiveElevation = new RecursiveElevation(elevation);

    window.temp1 = recursiveElevation;

    console.log({
        recursiveElevation,
    });

    const placedContainers = recursiveElevation.ids.map(id => recursiveElevation[id].placement);

    console.log({ placedContainers });

    return {
        ...elevation,
        placedContainers,
    };

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
