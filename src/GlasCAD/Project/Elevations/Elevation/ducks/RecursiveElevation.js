
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
    get placedDetails() { return this.detailIds.map(id => this.details[id].placement); }
}

const detailsKey = 'details[vertical][first]';
const containersKey = 'containers[vertical][first]';

class RecursiveContainer {
    constructor(container, elevation) {
        Object.assign(
            this,
            container,
            {
                elevation,
                [detailsKey]: {
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

    getDetails(vertical, first) {
        return this[detailsKey][vertical][first] || (
            this[detailsKey][vertical][first] = Object.values(this.elevation.details)
                .filter(({
                    firstContainerId,
                    secondContainerId,
                    vertical: detailVertical,
                }) => vertical === detailVertical && (
                    this.id === (first ?
                        firstContainerId
                        :
                        secondContainerId
                    )
                )));
    }

    getContainers(vertical, first) {
        return this[containersKey][vertical][first] || (
            this[containersKey][vertical][first] = this.getDetails(vertical, first)
                .reduce((details, detail) => details
                    .concat(detail.getContainer(!first)),
                    [])
                .filter(Boolean));
    }

    // details
    get leftDetails() { return this.getDetails(true, false); }
    get rightDetails() { return this.getDetails(true, true); }
    get topDetails() { return this.getDetails(false, true); }
    get bottomDetails() { return this.getDetails(false, false); }

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

    getContainer(first) {
        return this.elevation.containers[
            first ?
                this.firstContainerId
                :
                this.secondContainerId
        ];
    }

    sharesSide(detail) {

        const thisFirstContainer = this.getContainer(true);
        const thisSecondContainer = this.getContainer(false);

        const detailFirstContainer = detail.getContainer(true);
        const detailSecondContainer = detail.getContainer(false);

        return (
            (
                thisFirstContainer === detailFirstContainer
                &&
                (
                    this.bottomLeftOffset
                )
            )
            ||
            (
                thisSecondContainer === detailSecondContainer
            )
        )
    }

    sharesCorner(detail) {

    }

    sharesSharedDetail(detail) {
        return false;
    }

    get placement() {
        if (!this.__placement) {

            const {
                id,
                vertical,
                elevation: {
                    sightline,
                },
            } = this;

            const {
                placement: {
                    x: firstX = vertical ?
                        0
                        :
                        sightline,
                    y: firstY = vertical ?
                        sightline
                        :
                        0,
                    height: firstHeight = 0,
                    width: firstWidth = 0,
                } = {},
            } = this.getContainer(true) || {};

            const {
                placement: {
                    x: secondX = sightline,
                    y: secondY = sightline,
                    height: secondHeight = 0,
                    width: secondWidth = 0,
                } = {},
            } = this.getContainer(false) || {};

            const x = vertical ?
                firstX + firstWidth
                :
                Math.min(firstX, secondX);

            const y = vertical ?
                Math.min(firstY, secondY)
                :
                firstY + firstHeight;

            const height = vertical ?
                Math.max(firstY + firstHeight, secondY + secondHeight) - y
                :
                sightline;

            const width = vertical ?
                sightline
                :
                Math.max(firstX + firstWidth, secondX + secondWidth) - x;

            this.__placement = {
                id,
                x,
                y,
                height,
                width,
            };
        }
        return this.__placement;
    }

    get matchedDetails() {
        return this.__matchedDetails || (
            this.__matchedDetails = Object.values(this.elevation.details)
                .filter(detail => (
                    detail.vertical === this.vertical && (
                        this.sharesSide(detail)
                        ||
                        this.sharesCorner(detail)
                        ||
                        this.sharesSharedDetail(detail)
                    ))));
    }
}
