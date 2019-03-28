
const containersKey = 'containers<first>';
const runsAlongEdgeKey = 'runs_along_edge<first>';
const runsIntoEdgeKey = 'runs_into_edge<first>';

export default class RecursiveFrame {
    constructor(details, elevation) {

        const [{ vertical }] = details;

        Object.assign(
            this,
            {
                elevation,
                details,
                vertical,
                [containersKey]: {
                    true: undefined,
                    false: undefined,
                },
                [runsAlongEdgeKey]: {
                    true: undefined,
                    false: undefined,
                },
                [runsIntoEdgeKey]: {
                    true: undefined,
                    false: undefined,
                },
            },
        );
    }


    get refId() { return `${this.vertical ? 'Vertical' : 'Horizontal'}-${this.details.map(({ id }) => id).join('-')}`; }
    get ref() { return document.getElementById(this.refId); }

    contains = detail => this.details.includes(detail);

    get detailTypes() {
        return this.__detailTypes || (
            this.__detailTypes = this.details.map(({ detailId, detailType, configurationTypes }) => ({
                detailId,
                detailType,
                configurationTypes,
            }))
        );
    }

    getContainersByDirection = first => this[containersKey][first] || (
        this[containersKey][first] = this.details
            .map(detail => detail.getContainerByDirection(first))
        // .filter(Boolean)
    );

    getFirstOrLastContainerByDirection = (first, last) => {
        const containers = this.getContainersByDirection(first);
        return containers[last ?
            containers.length - 1
            :
            0];
    }

    get leftContainers() { if (this.vertical) return this.getContainersByDirection(true); }
    get rightContainers() { if (this.vertical) return this.getContainersByDirection(false); }
    get topContainers() { if (!this.vertical) return this.getContainersByDirection(false); }
    get bottomContainers() { if (!this.vertical) return this.getContainersByDirection(true); }

    get allContainers() {
        return [
            ...this.getContainersByDirection(true),
            ...this.getContainersByDirection(false),
        ];
    }

    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }

    get sightline() {
        return this.__sightline || (
            // add sightline calculation here based on detail option values
            this.__sightline = this.elevation.sightline
        );
    }

    getRunsAlongEdgeOfRoughOpening = first => {
        if (this[runsAlongEdgeKey][first] === undefined) {

            const firstEndContainer = this.getFirstOrLastContainerByDirection(true, !first);
            const secondEndContainer = this.getFirstOrLastContainerByDirection(false, !first);

            this[runsAlongEdgeKey][first] = !firstEndContainer || !secondEndContainer;
        }
        return this[runsAlongEdgeKey][first];
    }

    get firstEndRunsAlongEdgeOfRoughOpening() { return this.getRunsAlongEdgeOfRoughOpening(true); }
    get lastEndRunsAlongEdgeOfRoughOpening() { return this.getRunsAlongEdgeOfRoughOpening(false); }

    getRunsIntoEdgeOfRoughOpening = first => {
        if (this[runsIntoEdgeKey][first] === undefined) {

            const { vertical } = this;

            const direction = [vertical, first];

            const firstEndContainer = this.getFirstOrLastContainerByDirection(true, !first);
            const secondEndContainer = this.getFirstOrLastContainerByDirection(false, !first);

            this[runsIntoEdgeKey][first] = (
                (
                    !firstEndContainer
                    ||
                    !firstEndContainer.getFirstOrLastContainerByDirection(...direction, !first)
                ) && (
                    !secondEndContainer
                    ||
                    !secondEndContainer.getFirstOrLastContainerByDirection(...direction, !first)
                )
            );
        }
        return this[runsIntoEdgeKey][first];
    }

    get firstEndRunsIntoEdgeOfRoughOpening() { return this.getRunsIntoEdgeOfRoughOpening(true); }
    get lastEndRunsIntoEdgeOfRoughOpening() { return this.getRunsIntoEdgeOfRoughOpening(false); }

    get placement() {
        const {
            refId,
            vertical,
            sightline,
            firstEndRunsAlongEdgeOfRoughOpening,
            lastEndRunsAlongEdgeOfRoughOpening,
            firstEndRunsIntoEdgeOfRoughOpening,
            lastEndRunsIntoEdgeOfRoughOpening,
            elevation: {
                verticalFramesRunThroughHeadAndSill,
            },
        } = this;

        // farthest to the bottom / left
        const {
            leftContainers: {
                0: firstLeftContainer,
                length: leftContainersLength = 0,
            } = [],
            rightContainers: {
                0: firstRightContainer,
                length: rightContainersLength = 0,
            } = [],
            topContainers: {
                0: firstTopContainer,
                length: topContainersLength = 0,
            } = [],
            bottomContainers: {
                0: firstBottomContainer,
                length: bottomContainersLength = 0,
            } = [],
        } = this;

        // farthest to the top / right
        const {
            leftContainers: {
                [leftContainersLength - 1]: lastLeftContainer = 0,
            } = {},
            rightContainers: {
                [rightContainersLength - 1]: lastRightContainer = 0,
            } = {},
            topContainers: {
                [topContainersLength - 1]: lastTopContainer = 0,
            } = {},
            bottomContainers: {
                [bottomContainersLength - 1]: lastBottomContainer = 0,
            } = {},
        } = this;

        const x = vertical ?
            Math.min(
                firstLeftContainer ?
                    firstLeftContainer.placement.x + firstLeftContainer.placement.width
                    :
                    Infinity,
                firstRightContainer ?
                    firstRightContainer.placement.x - sightline
                    :
                    Infinity
            )
            :
            Math.min(
                firstBottomContainer ?
                    firstBottomContainer.placement.x
                    :
                    Infinity,
                firstTopContainer ?
                    firstTopContainer.placement.x
                    :
                    Infinity
            );

        const y = vertical ?
            Math.min(
                firstLeftContainer ?
                    firstLeftContainer.placement.y
                    :
                    Infinity,
                firstRightContainer ?
                    firstRightContainer.placement.y
                    :
                    Infinity,
            )
            :
            Math.min(
                firstBottomContainer ?
                    firstBottomContainer.placement.y + firstBottomContainer.placement.height
                    :
                    Infinity,
                firstTopContainer ?
                    firstTopContainer.placement.y - sightline
                    :
                    Infinity,
            );

        const height = vertical ?
            Math.max(
                lastLeftContainer ?
                    lastLeftContainer.placement.y + lastLeftContainer.placement.height
                    :
                    0,
                lastRightContainer ?
                    lastRightContainer.placement.y + lastRightContainer.placement.height
                    :
                    0
            ) - y
            :
            sightline;

        const width = vertical ?
            sightline
            :
            Math.max(
                lastBottomContainer ?
                    lastBottomContainer.placement.x + lastBottomContainer.placement.width
                    :
                    0,
                lastTopContainer ?
                    lastTopContainer.placement.x + lastTopContainer.placement.width
                    :
                    0,
            ) - x;

        const verticalLastContainer = lastLeftContainer || lastRightContainer;
        const verticalFirstContainer = firstLeftContainer || firstRightContainer;

        const needsTopExtension = vertical
            &&
            (
                verticalFramesRunThroughHeadAndSill ?
                    lastEndRunsIntoEdgeOfRoughOpening
                    :
                    lastEndRunsAlongEdgeOfRoughOpening
            )
            &&
            !verticalLastContainer.topContainers.length;

        const needsBottomExtension = vertical
            &&
            (
                verticalFramesRunThroughHeadAndSill ?
                    firstEndRunsIntoEdgeOfRoughOpening
                    :
                    firstEndRunsAlongEdgeOfRoughOpening
            )
            &&
            !verticalFirstContainer.bottomContainers.length;

        const verticalTopExtension = needsTopExtension ?
            verticalLastContainer.topFrame.sightline
            :
            0;
        const verticalBottomExtension = needsBottomExtension ?
            verticalLastContainer.bottomFrame.sightline
            :
            0;

        return {
            recursiveFrame: this,
            refId,
            vertical,
            x,
            y: y - verticalBottomExtension,
            height: height + verticalBottomExtension + verticalTopExtension,
            width,
        };
    }
}
