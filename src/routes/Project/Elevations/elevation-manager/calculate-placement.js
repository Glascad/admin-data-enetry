import _ from 'lodash';

const optionValuesAreCompatible = () => true;

export default function calculatePlacement({
    elevation,
    elevation: {
        _elevationContainers = [],
        _containerDetails = [],
        sightline = 10,
    } = {},
}) {
    const containersById = _elevationContainers
        .reduce((byId, container) => ({
            ...byId,
            [container.id]: container,
        }), {});

    const recursiveElevation = Object.entries(containersById)
        .reduce((elevation, [id, container]) => ({
            ...elevation,
            [id]: {
                ...container,
                // utility methods
                getFrames(vertical, first) {
                    return _containerDetails
                        .filter(({
                            firstContainerId,
                            secondContainerId,
                            vertical: detailVertical,
                        }) => vertical === detailVertical && (
                            (
                                first
                                &&
                                id === `${firstContainerId}`
                            ) || (
                                !first
                                &&
                                id === `${secondContainerId}`
                            )
                        ))
                        .map(detail => ({
                            ...detail,
                            getContainers(first) {
                                return recursiveElevation[
                                    first ?
                                        detail.firstContainerId
                                        :
                                        detail.secondContainerId
                                ];
                            }
                        }));
                },
                getContainers(vertical, first) {
                    return this.getFrames(vertical, first)
                        .reduce((frames, detail) => frames
                            .concat(detail.getContainers(!first)),
                            []);
                },
                // frames
                getLeftFrames() { return this.getFrames(true, false); },
                getRightFrames() { return this.getFrames(true, true); },
                getTopFrames() { return this.getFrames(false, true); },
                getBottomFrames() { return this.getFrames(false, false); },
                // containers
                getLeftContainers() { return this.getContainers(true, false); },
                getRightContainers() { return this.getContainers(true, true); },
                getTopContainers() { return this.getContainers(false, true); },
                getBottomContainers() { return this.getContainers(false, false); },
            },
        }), {});

    console.log({ recursiveElevation });

    window.temp1 = recursiveElevation;

    console.log({ containersById });

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
