import { GET_RELATIVE_DIRECTIONS, Loggable, unique } from '../../../../../../../utils';
import sortDetails from './sort-details';

const matchedDetailsKey = 'matched_details<first>';
const detailsByContainerKey = 'details_by_container<first>';
const detailsWithSharedContainersKey = 'details_with_shared_container<first>';
const detailAcrossPerpendicularKey = 'details_across_perpendiculars<detailFirst><containerFirst>';

export default class RecursiveDetail extends Loggable {

    static instanceCount = 0;

    constructor(detail, elevation) {
        super();
        Object.assign(
            this,
            detail,
            {
                class: RecursiveDetail,
                instanceCount: ++RecursiveDetail.instanceCount,
                elevation,
                [matchedDetailsKey]: {
                    true: undefined,
                    false: undefined,
                },
                [detailsByContainerKey]: {
                    true: undefined,
                    false: undefined,
                },
                [detailsWithSharedContainersKey]: {
                    true: undefined,
                    false: undefined,
                },
                [detailAcrossPerpendicularKey]: {
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

    // REFERENCES
    get refId() {
        return `Detail-${
            this.id
            // }<${
            // this.instanceCount
            }>`;
    }
    get ref() { return document.getElementById(this.refId); }

    registerReactComponent = ReactComponent => this.__ReactComponent = ReactComponent;

    get ReactComponent() { return this.__ReactComponent; }

    get _frame() { return this.elevation.allFrames.find(_frame => _frame.contains(this)); }
    get frameRefId() { return this._frame.refId; }
    get frameRef() { return this._frame.ref; }

    get frameDetail() { return this._frame.frameDetails.find(fd => fd.includes(this)); }
    get placedFrameDetail() { return this._frame.placedFrameDetails[this._frame.frameDetails.indexOf(this.frameDetail)]; }

    getContainerByDirection = first => this.elevation.containers[
        first ?
            this.firstContainerId
            :
            this.secondContainerId
    ];

    get firstContainer() { return this.getContainerByDirection(true); }
    get secondContainer() { return this.getContainerByDirection(false); }
    get bothContainers() { return [this.firstContainer, this.secondContainer]; }

    // ROUGH OPENING
    get exists() {
        const {
            firstContainer,
            secondContainer,
        } = this;
        return !!(
            (
                firstContainer
                &&
                !firstContainer.customRoughOpening
            )
            ||
            (
                secondContainer
                &&
                !secondContainer.customRoughOpening
            )
        );
    }

    // OPTIONS / TYPES
    get detailType() {
        // determine detail type
        return (
            // this.exists && (
            this.__type || (
                this.__type = this.vertical ?
                    (
                        !this.firstContainer
                        ||
                        this.firstContainer.customRoughOpening
                        ||
                        !this.secondContainer
                        ||
                        this.secondContainer.customRoughOpening
                    ) ?
                        'JAMB'
                        :
                        'MULLION'
                    :
                    (
                        !this.firstContainer
                        ||
                        this.firstContainer.customRoughOpening
                    ) ?
                        'SILL'
                        :
                        (
                            !this.secondContainer
                            ||
                            this.secondContainer.customRoughOpening
                        ) ?
                            'HEAD'
                            :
                            'HORIZONTAL'
            )
            // )
        );
    }

    get configurationTypes() {
        // if (!this.exists) return [];
        // find all configuration types that are applicable to detail type
        return (
            this.__configurationTypes || (
                this.__configurationTypes = this.elevation
                    .detailTypeConfigurationTypes
                    .filter(({
                        _detailType: {
                            type: detailTypeName,
                        },
                        _configurationType: {
                            type: configurationTypeName
                        },
                    }) => configurationTypeName && detailTypeName === this.detailType)
            )
        );
    }

    get appliedConfigurationTypes() {
        // look at all optional detail types (system-level, elevation-level, lite-level, and detail-level)
        // return only configuration types that are turned on
        return this.configurationTypes;
    }

    get appliedOptionValues() {
        // look at all selected option values (system-level, elevation-level, lite-level, and detail-level)
        // return only option values that are selected
        return this._detailOptionValues || [];
    }

    compareOtherDetail = detail => (
        // this.exists
        // &&
        this.detailType === detail.detailType
        &&
        this.appliedConfigurationTypes.every(act => detail.appliedConfigurationTypes.includes(act))
        &&
        this.appliedOptionValues.every(aov => detail.appliedOptionValues.includes(aov))
    );

    get detailId() {
        return (
            // this.exists && (
            this.__detailId || (
                this.__detailId = `${
                this.detailType === 'HORIZONTAL' ?
                    'Z'
                    :
                    this.detailType[0].toUpperCase()
                }${
                this.elevation.allDetails
                    .reduce(({ num, finished }, detail) => (
                        finished || detail === this ?
                            { num, finished: true }
                            :
                            detail.detailType === this.detailType ?
                                this.compareOtherDetail(detail) ?
                                    { num }
                                    :
                                    { num: num + 1 }
                                :
                                { num }
                    ), { num: 1 })
                    .num
                }`
            )
        );
    }

    // NAVIGATION / RENDERING
    getDetailsByContainer = first => {
        // if (!this.exists) return [];

        if (!this[detailsByContainerKey][first]) {
            const direction = [!this.vertical, first];

            const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);

            const container = this.getContainerByDirection(first);

            this[detailsByContainerKey][first] = container ?
                container.getDetailsByDirection(...BACKWARD)
                :
                [];
        }
        return this[detailsByContainerKey][first];
    }

    getDetailsWithSharedContainersByContainerDirection = first => {
        // console.log(this.id);
        // if (!this.exists) return [];

        if (!this[detailsWithSharedContainersKey][first]) {

            const details = this.getDetailsByContainer(first);

            const {
                0: firstDetail,
                [details.length - 1]: lastDetail,
            } = details;

            this[detailsWithSharedContainersKey][first] = unique(
                !firstDetail || (firstDetail === this) ?
                    []
                    :
                    firstDetail.getDetailsWithSharedContainersByContainerDirection(!first),
                details,
                !lastDetail || (lastDetail === this) ?
                    []
                    :
                    lastDetail.getDetailsWithSharedContainersByContainerDirection(!first),
            ).sort(sortDetails);

        }
        return this[detailsWithSharedContainersKey][first];
    }

    get allDetailsWithSharedContainers() {
        // if (!this.exists) return [];

        return this.__detailsWithSharedContainers || (
            this.__detailsWithSharedContainers = unique(
                this.getDetailsWithSharedContainersByContainerDirection(true),
                this.getDetailsWithSharedContainersByContainerDirection(false),
            )
                .sort(sortDetails)
        );
    }

    get runsAlongEdgeOfRoughOpening() {
        return (
            !this.firstContainer
            ||
            this.firstContainer.customRoughOpening
            ||
            !this.secondContainer
            ||
            this.secondContainer.customRoughOpening
        );
    }
    get shouldRunThroughPerpendiculars() {
        if (!this.exists) return false;

        else return this.vertical;
    }

    getDetailAcrossPerpendicularByDirectionAndContainerDirection = (detailFirst, containerFirst) => {
        if (!this[detailAcrossPerpendicularKey][detailFirst][containerFirst]) {

            const { vertical } = this;

            const containerDirection = [!vertical, containerFirst];

            const detailDirection = [vertical, detailFirst];

            const {
                BACKWARD: cBACKWARD,
            } = GET_RELATIVE_DIRECTIONS(containerDirection);

            const {
                FORWARD: dFORWARD,
            } = GET_RELATIVE_DIRECTIONS(detailDirection);

            const container = this.getContainerByDirection(containerFirst);

            const adjacentContainer = container
                &&
                container.getFirstOrLastContainerByDirection(...dFORWARD, containerFirst);

            this[detailAcrossPerpendicularKey][detailFirst][containerFirst] = adjacentContainer
                &&
                adjacentContainer.getFirstOrLastDetailByDirection(...cBACKWARD, detailFirst);
        }
        return this[detailAcrossPerpendicularKey][detailFirst][containerFirst];
    }

    getDetailAcrossPerpendicularByDirection = detailFirst => {
        const firstDetail = this.getDetailAcrossPerpendicularByDirectionAndContainerDirection(detailFirst, true);
        const secondDetail = this.getDetailAcrossPerpendicularByDirectionAndContainerDirection(detailFirst, false);

        if (firstDetail && secondDetail) {
            if (firstDetail === secondDetail) return firstDetail
        } else {
            return firstDetail || secondDetail
        }
    }

    get allMatchedDetails() {
        if (!this.__allMatchedDetails) {
            // console.log("GETTING MATCHED DETAILS: " + this.id);
            this.__allMatchedDetails = unique(
                this.getMatchedDetailsByDirection(true),
                this,
                this.getMatchedDetailsByDirection(false),
            )
        }
        return this.__allMatchedDetails;
    }

    getNextMatchedDetailByDirection = first => {
        const nextDetail = this.getNextDetailByDirection(first);
        return (
            this.allDetailsWithSharedContainers.includes(nextDetail)
            ||
            this.shouldRunThroughPerpendiculars
        )
            &&
            this.exists === (nextDetail && nextDetail.exists)
            &&
            nextDetail
    }

    getMatchedDetailsByDirection = first => {
        const nextDetail = this.getNextMatchedDetailByDirection(first);
        return (nextDetail) ?
            [nextDetail].concat(nextDetail.getMatchedDetailsByDirection(first)).sort(sortDetails)
            :
            []
    }

    getNextDetailByDirection = first => {
        const { allDetailsWithSharedContainers } = this;
        const thisIndex = allDetailsWithSharedContainers.indexOf(this);
        const nextIndex = first ?
            thisIndex - 1
            :
            thisIndex + 1;

        const nextDetail = allDetailsWithSharedContainers[nextIndex]
            ||
            this.getDetailAcrossPerpendicularByDirection(first);

        return nextDetail;
    }

    get previousDetail() { return this.getNextDetailByDirection(false); }
    get nextDetail() { return this.getNextDetailByDirection(true); }

    getAllNextDetailsByDirection = first => {
        const nextDetail = this.getNextDetailByDirection(first);
        return (nextDetail) ?
            [nextDetail].concat(nextDetail.getAllNextDetailsByDirection(first)).sort(sortDetails)
            :
            []
    }

    // PLACEMENT
    get placement() {
        // if (!this.exists) return {};
        if (!this.__placement) {
            const {
                vertical,
                firstContainer,
                secondContainer,
                _frame: {
                    placement: {
                        x: frameX,
                        y: frameY,
                        height: frameHeight,
                        width: frameWidth,
                    },
                },
            } = this;

            const x = vertical ?
                frameX
                :
                Math.max(
                    firstContainer ?
                        firstContainer.placement.x
                        :
                        0,
                    secondContainer ?
                        secondContainer.placement.x
                        :
                        0,
                );

            const y = vertical ?
                Math.max(
                    firstContainer ?
                        firstContainer.placement.y
                        :
                        0,
                    secondContainer ?
                        secondContainer.placement.y
                        :
                        0,
                )
                :
                frameY;

            const height = vertical ?
                Math.min(
                    firstContainer ?
                        firstContainer.placement.y + firstContainer.placement.height
                        :
                        Infinity,
                    secondContainer ?
                        secondContainer.placement.y + secondContainer.placement.height
                        :
                        Infinity,
                ) - y
                :
                frameHeight;

            const width = vertical ?
                frameWidth
                :
                Math.min(
                    firstContainer ?
                        firstContainer.placement.x + firstContainer.placement.width
                        :
                        Infinity,
                    secondContainer ?
                        secondContainer.placement.x + secondContainer.placement.width
                        :
                        Infinity,
                ) - x;

            this.__placement = {
                x,
                y,
                height,
                width,
            };
        }
        return this.__placement;
    }
}
