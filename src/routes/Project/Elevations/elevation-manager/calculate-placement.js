
export default function calculatePlacement({
    elevation,
    elevation: {
        _elevationContainers = [],
        sightline = 10,
    } = {},
}) {
    // const 
    return {
        ...elevation,
        placedContainers: _elevationContainers
            .map(({
                daylightOpening: {
                    x,
                    y,
                },
            }) => ({
                x: sightline,
                y: sightline,
                height: y,
                width: x,
            })),
        placedFrames: _elevationContainers
            .reduce((frames, {
                firstContainerDetails,
                secondContainerDetails,
            }) => frames.concat([

            ]), []),
    };
}
