
export class RecursiveElevation {
    constructor({
        finishedFloorHeight = 0,
        roughOpening = {},
        _elevationContainers = [],
        _containerDetails = [],
        sightline = 10,
    } = {}) {

        // mark fake ids with underscores

        const containers = _elevationContainers
            .map(c => ({
                ...c,
                id: c.id || `_${c.fakeId}`,
            }));

        const details = _containerDetails
            .map(d => ({
                ...d,
                id: d.id || `_${d.fakeId}`,
                firstContainerId: d.firstContainerId || `_${d.firstContainerFakeId}`,
                secondContainerId: d.secondContainerId || `_${d.secondContainerFakeId}`,
            }));

        const detailsById = details
            .reduce((byId, detail) => ({
                ...byId,
                [detail.id]: detail,
            }), {});

        const containersById = containers
            .reduce((byId, container) => ({
                ...byId,
                [container.id]: container,
            }), {});

        Object.assign(
            this,
            {
                finishedFloorHeight,
                roughOpening,
                containers,
                sightline,
                detailIds: Object.keys(detailsById),
                containerIds: Object.keys(containersById),
                details: Object.entries(detailsById)
                    .reduce((all, [id, detail]) => ({
                        ...all,
                        [id]: new RecursiveDetail(detail, this),
                    }), {}),
                containers: Object.entries(containersById)
                    .reduce((all, [id, container]) => ({
                        ...all,
                        [id]: new RecursiveContainer(container, this),
                    }), {}),
            },
        );

        const [originalContainerId] = Object.entries(containersById)
            .find(([_, { original }]) => original) || [];

        this.originalContainer = this.containers[originalContainerId];
    }

    get placedContainers() { return this.containerIds.map(id => this.containers[id].placement); }
    get placedFrames() { return []; }
}

const framesKey = 'frames[vertical][first]';
const containersKey = 'containers[vertical][first]';

class RecursiveContainer {
    constructor(container, elevation) {
        Object.assign(
            this,
            container,
            {
                elevation,
                [framesKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                },
                [containersKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                },
            },
        );
    }

    getFrames(vertical, first) {
        return this[framesKey][vertical][first] || (
            this[framesKey][vertical][first] = Object.values(this.elevation.details)
                .filter(({
                    firstContainerId,
                    secondContainerId,
                    vertical: frameVertical,
                }) => vertical === frameVertical && (
                    this.id === (first ?
                        firstContainerId
                        :
                        secondContainerId
                    )
                ))
                // .map(frame => new RecursiveFrame(frame, this.elevation))
        );
    }

    getContainers(vertical, first) {
        return this[containersKey][vertical][first] || (
            this[containersKey][vertical][first] = this.getFrames(vertical, first)
                .reduce((frames, frame) => frames
                    .concat(frame.getContainers(!first)),
                    [])
                .filter(Boolean)
        );
    }

    // frames
    get leftFrames() { return this.getFrames(true, false); }
    get rightFrames() { return this.getFrames(true, true); }
    get topFrames() { return this.getFrames(false, true); }
    get bottomFrames() { return this.getFrames(false, false); }

    // containers
    get leftContainers() { return this.getContainers(true, false); }
    get rightContainers() { return this.getContainers(true, true); }
    get topContainers() { return this.getContainers(false, true); }
    get bottomContainers() { return this.getContainers(false, false); }

    get allLeftContainers() {
        return this.__allLeftContainers || (
            this.__allLeftContainers = this.getContainers(true, false)
                .reduce((all, container) => all
                    .concat([container]
                        .concat(container.allLeftContainers)),
                    []));
    }
    get allRightContainers() {
        return this.__allRightContainers || (
            this.__allRightContainers = this.getContainers(true, true)
                .reduce((all, container) => all
                    .concat([container]
                        .concat(container.allRightContainers)),
                    []));
    }
    get allTopContainers() {
        return this.__allTopContainers || (
            this.__allTopContainers = this.getContainers(false, true)
                .reduce((all, container) => all
                    .concat([container]
                        .concat(container.allTopContainers)),
                    []));
    }
    get allBottomContainers() {
        return this.__allBottomContainers || (
            this.__allBottomContainers = this.getContainers(false, false)
                .reduce((all, container) => all
                    .concat([container]
                        .concat(container.allBottomContainers)),
                    []));
    }

    get placement() {
        return this.__placement || (
            this.__placement = {
                id: this.id,
                height: this.daylightOpening.y,
                width: this.daylightOpening.x,
                x: this.elevation.sightline + (
                    (
                        this.bottomLeftOffset
                        &&
                        this.bottomLeftOffset.x
                    ) || (
                        this.leftContainers[0]
                        &&
                        (
                            this.leftContainers[0].placement.x
                            +
                            this.leftContainers[0].daylightOpening.x
                        )
                    ) || 0
                ),
                y: this.elevation.sightline + (
                    (
                        this.bottomLeftOffset
                        &&
                        this.bottomLeftOffset.y
                    ) || (
                        this.bottomContainers[0]
                        &&
                        (
                            this.bottomContainers[0].placement.y
                            +
                            this.bottomContainers[0].daylightOpening.y
                        )
                    ) || 0
                ),
            });
    }
}

class RecursiveDetail {
    constructor(detail, elevation) {
        Object.assign(
            this,
            detail,
            {
                elevation,
            },
        );
    }
    getContainers(first) {
        return this.elevation.containers[
            first ?
                this.firstContainerId
                :
                this.secondContainerId
        ];
    }
    get matchedDetails() {
        return this.__matchedDetails || (
            this.__matchedDetails = []);
    }
}

class RecursiveFrame {
    constructor(frame, elevation) {
        Object.assign(
            this,
            frame,
            {
                elevation,
            },
        );
    }
    getContainers(first) {
        return this.elevation.containers[
            first ?
                this.firstContainerId
                :
                this.secondContainerId
        ];
    }
}
