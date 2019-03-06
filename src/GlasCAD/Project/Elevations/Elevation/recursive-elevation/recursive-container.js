
const detailsKey = 'details[vertical][first]';
const containersKey = 'containers[vertical][first]';

export default class RecursiveContainer {
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

    get ref() { return document.querySelector(`#Container-${this.id}`); }

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
