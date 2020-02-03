import { lastItem, Loggable, replace, unique } from "../../../../../../../utils";

const containersKey = 'containers<first>';
const runsAlongEdgeKey = 'runs_along_edge<first>';
const runsIntoEdgeKey = 'runs_into_edge<first>';
const canDeleteKey = 'can_delete<first>';

export default class RecursiveFrame extends Loggable {

    static instanceCount = 0;

    constructor(details, elevation, initialDetail) {

        super();

        const [{ vertical, exists }] = details;

        Object.assign(
            this,
            {
                class: RecursiveFrame,
                instanceCount: ++RecursiveFrame.instanceCount,
                elevation,
                details,
                initialDetail,
                vertical,
                exists,
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
                [canDeleteKey]: {
                    true: undefined,
                    false: undefined,
                },
            },
        );
    }

    get refId() {
        return `${
            this.vertical ? 'Vertical' : 'Horizontal'
            }-${
            this.details.map(({ id }) => id).join('-')
            }<${
            this.instanceCount
            }>`;
    }

    get ref() { return document.getElementById(this.refId); }

    registerReactComponent = ReactComponent => this.__ReactComponent = ReactComponent;

    get ReactComponent() { return this.__ReactComponent; }

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

    get frameDetails() {
        return this.__allFrameDetails || (
            this.__allFrameDetails = this.details.reduce((groupedDetails, detail, i, { length }) => (
                detail.detailId === (lastItem(lastItem(groupedDetails) || []) || {}).detailId ?
                    replace(groupedDetails,
                        groupedDetails.length - 1,
                        lastItem(groupedDetails).concat(detail)
                    )
                    :
                    groupedDetails.concat([[detail]])
            ), [])
        );
    }

    get placedFrameDetails() {
        return this.frameDetails.map((placedDetails, i, { length }) => {
            // calculate placement of frame details
            const lastDetail = lastItem(placedDetails);

            const y = (this.vertical && i !== 0) ?
                placedDetails[0].placement.y
                :
                this.placement.y;

            const x = (!this.vertical && i !== 0) ?
                placedDetails[0].placement.x
                :
                this.placement.x;

            const height = this.vertical ?
                (
                    i === length - 1 ?
                        this.placement.y + this.placement.height
                        :
                        lastDetail.placement.y + lastDetail.placement.height
                ) - y
                :
                this.placement.height;

            const width = this.vertical ?
                this.placement.width
                :
                (
                    i === length - 1 ?
                        this.placement.x + this.placement.width
                        :
                        lastDetail.placement.x + lastDetail.placement.width
                ) - x;

            return {
                x,
                y,
                height,
                width,
            };
        });
    }

    getDetailAcrossPerpendicularByDirection = first => {
        const {
            details,
            details: {
                length,
            },
        } = this;
        const endDetail = details[first ? 0 : length - 1];
        return endDetail.getNextDetailByDirection(first);
    }

    getNextFrameByDirection = first => {
        const { _frame } = this.getDetailAcrossPerpendicularByDirection(first) || {};
        return _frame;
    }

    getContainersByDirection = first => this[containersKey][first] || (
        this[containersKey][first] = unique(this.details
            .map(detail => detail.getContainerByDirection(first)))
        // .filter(Boolean)
    );

    getFirstOrLastContainerByDirection = (first, last) => {
        const containers = this.getContainersByDirection(first);
        return containers[last ?
            containers.length - 1
            :
            0];
    }

    getFirstOrLastDetail = last => this.details[last ? this.details.length - 1 : 0];

    getPerpendicularFrameByDirection = first => {
        const container = this.getFirstOrLastContainerByDirection(true, !first);
        if (container) return container.getFrameByDirection(this.vertical, first);
    }

    get firstContainers() { return this.getContainersByDirection(true); }
    get secondContainers() { return this.getContainersByDirection(false); }

    get realFirstContainers() {
        return this.__realFirstContainers || (
            this.__realFirstContainers = this.firstContainers
                .filter(({ customRoughOpening } = { customRoughOpening: false }) => !customRoughOpening)
        );
    }
    get realSecondContainers() {
        return this.__realSecondContainers || (
            this.__realSecondContainers = this.secondContainers
                .filter(({ customRoughOpening } = { customRoughOpening: false }) => !customRoughOpening)
        );
    }

    get leftContainers() { return this.vertical ? this.firstContainers : []; }
    get rightContainers() { return this.vertical ? this.secondContainers : []; }
    get topContainers() { return this.vertical ? [] : this.secondContainers; }
    get bottomContainers() { return this.vertical ? [] : this.firstContainers; }

    get realLeftContainers() { return this.vertical ? this.realFirstContainers : []; }
    get realRightContainers() { return this.vertical ? this.realSecondContainers : []; }
    get realTopContainers() { return this.vertical ? [] : this.realSecondContainers; }
    get realBottomContainers() { return this.vertical ? [] : this.realFirstContainers; }

    get firstContainerRefs() { return this.firstContainers.map(({ ref }) => ref); }
    get secondContainerRefs() { return this.secondContainers.map(({ ref }) => ref); }

    get leftContainerRefs() { return this.leftContainers.map(({ ref }) => ref); }
    get rightContainerRefs() { return this.rightContainers.map(({ ref }) => ref); }
    get topContainerRefs() { return this.topContainers.map(({ ref }) => ref); }
    get bottomContainerRefs() { return this.bottomContainers.map(({ ref }) => ref); }

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

            this[runsAlongEdgeKey][first] = !!(
                !firstEndContainer
                ||
                firstEndContainer.customRoughOpening
                ||
                !secondEndContainer
                ||
                secondEndContainer.customRoughOpening
            );
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

            const firstEndAdjacentContainer = firstEndContainer
                &&
                firstEndContainer.getFirstOrLastContainerByDirection(...direction, true);

            const secondEndAdjacentContainer = secondEndContainer
                &&
                secondEndContainer.getFirstOrLastContainerByDirection(...direction, false);

            this[runsIntoEdgeKey][first] = (
                (
                    !firstEndContainer
                    ||
                    firstEndContainer.customRoughOpening
                    ||
                    !firstEndAdjacentContainer
                    ||
                    firstEndAdjacentContainer.customRoughOpening
                ) && (
                    !secondEndContainer
                    ||
                    secondEndContainer.customRoughOpening
                    ||
                    !secondEndAdjacentContainer
                    ||
                    secondEndAdjacentContainer.customRoughOpening
                )
            );
        }
        return this[runsIntoEdgeKey][first];
    }

    get firstEndRunsIntoEdgeOfRoughOpening() { return this.getRunsIntoEdgeOfRoughOpening(true); }
    get lastEndRunsIntoEdgeOfRoughOpening() { return this.getRunsIntoEdgeOfRoughOpening(false); }

    getNeedsExtensionByDirection = first => {
        return !!(
            this.vertical
            &&
            this.getRunsIntoEdgeOfRoughOpening(first)
        );
    }

    get needsTopExtension() { return this.getNeedsExtensionByDirection(false); }
    get needsBottomExtension() { return this.getNeedsExtensionByDirection(true); }

    getExtensionByDirectionAndContainerDirection = (first, containerFirst) => {
        if (!this.getNeedsExtensionByDirection(first)) return 0;

        const endContainer = this.getFirstOrLastContainerByDirection(containerFirst, !first);

        const perpendicular = endContainer && endContainer.getFrameByDirection(this.vertical, first);

        return (
            (
                perpendicular
                &&
                perpendicular.sightline
            )
            ||
            0
        );
    }

    getExtensionByDirection = first => {
        return (
            this.getExtensionByDirectionAndContainerDirection(first, true)
            ||
            this.getExtensionByDirectionAndContainerDirection(first, false)
        );
    }

    get topExtension() { return this.getExtensionByDirection(false); }
    get bottomExtension() { return this.getExtensionByDirection(true); }

    get placement() {
        const {
            vertical,
            sightline,
            topExtension,
            bottomExtension,
        } = this;

        // farthest to the bottom / left
        const {
            realLeftContainers: {
                0: firstLeftContainer,
                length: leftContainersLength = 0,
            } = [],
            realRightContainers: {
                0: firstRightContainer,
                length: rightContainersLength = 0,
            } = [],
            realTopContainers: {
                0: firstTopContainer,
                length: topContainersLength = 0,
            } = [],
            realBottomContainers: {
                0: firstBottomContainer,
                length: bottomContainersLength = 0,
            } = [],
        } = this;

        // farthest to the top / right
        const {
            realLeftContainers: {
                [leftContainersLength - 1]: lastLeftContainer = 0,
            } = {},
            realRightContainers: {
                [rightContainersLength - 1]: lastRightContainer = 0,
            } = {},
            realTopContainers: {
                [topContainersLength - 1]: lastTopContainer = 0,
            } = {},
            realBottomContainers: {
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

        return {
            x,
            y: y - bottomExtension,
            height: height + bottomExtension + topExtension,
            width,
        };
    }

    // ACTIONS

    // MOVE
    get canMoveAtAll() {
        return (
            this.firstContainers.some(Boolean)
            &&
            this.secondContainers.some(Boolean)
        );
    }

    maximumMovementByDirection = first => this.canMoveAtAll
        &&
        this.getContainersByDirection(first)
            .reduce((minimum, {
                id,
                rawContainer: {
                    daylightOpening: {
                        dimensions: {
                            width,
                            height,
                        }
                    } = {},
                } = {},
            } = {}) => Math.min(
                minimum,
                !id ?
                    Infinity
                    :
                    this.vertical ?
                        width - this.elevation.minimumDaylightOpening
                        :
                        height - this.elevation.minimumDaylightOpening,
            ), Infinity)

    canMoveByDirection = first => this.canMoveAtAll
        &&
        this.getContainersByDirection(first)
            .every(({
                id,
                rawContainer: {
                    daylightOpening: {
                        dimensions: {
                            width,
                            height,
                        }
                    } = {},
                } = {},
            } = {}) => !id || (
                this.vertical ?
                    width > this.elevation.minimumDaylightOpening
                    :
                    height > this.elevation.minimumDaylightOpening
            ));

    canMoveByDistance = distance => Math.abs(distance) <= this.maximumMovementByDirection(distance > 0);

    get maximumMovementFirst() { return this.maximumMovementByDirection(true); }
    get maximumMovementSecond() { return this.maximumMovementByDirection(false); }

    get canMoveFirst() { return this.canMoveByDirection(true); }
    get canMoveSecond() { return this.canMoveByDirection(false); }

    get canMove() { return this.canMoveFirst || this.canMoveSecond; }

    // DELETE
    canDeleteByDirection = first => {
        return this[canDeleteKey][first] || (
            this[canDeleteKey][first] = this
                .getContainersByDirection(first)
                .every(container => container && container.canMergeByDirection(!this.vertical, !first))
        );
    }

    get canDelete() {
        return (
            this.canDeleteByDirection(true)
            &&
            this.canDeleteByDirection(false)
        );
    }

    // EXTEND
    findExtendedContainer = (bottom, first) => {
        const container = this.getFirstOrLastContainerByDirection(bottom, !first);
        if (!container) return container;
        const containersByDirection = container.getImmediateContainersByDirection(this.vertical, first);
        return bottom ?
            containersByDirection[containersByDirection.length - 1]
            :
            containersByDirection[0]
    };

    canExtendByDirection = first => this.findExtendedContainer(true, first) === this.findExtendedContainer(false, first);

    firstOrLastDistanceByExtend = (first) => {
        const container = this.findExtendedContainer(true, first);
        if (!container) return 0;
        return this.vertical ?
            (container.placementX + container.daylightOpening.dimensions.width) - this.placement.x - this.elevation.sightline
            :
            (container.placementY + container.daylightOpening.dimensions.height) - this.placement.y - this.elevation.sightline
    };

    get firstDistanceByExtend() { return this.firstOrLastDistanceByExtend(true); }
    get lastDistanceByExtend() { return this.firstOrLastDistanceByExtend(false); }

    canExtendFirstOrLast = first => {
        const container = this.findExtendedContainer(true, first);
        return (
            container
            &&
            this.canExtendByDirection
            &&
            container.canAddIntermediateByVerticalAndDistance(this.vertical, this.firstOrLastDistanceByExtend(first))
            &&
            !this.getRunsIntoEdgeOfRoughOpening(first)
        );
    };

    get canExtendFirst() { return this.canExtendFirstOrLast(true); }
    get canExtendLast() { return this.canExtendFirstOrLast(false); }

    // ADD-BAY    
    get canAddBay() { return this.placement.height === this.elevation.roughOpening.height; }
}
