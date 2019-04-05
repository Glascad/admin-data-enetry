
import { unique } from '../../../../../../../utils';
import { sortDetails } from './sort-details';
import { GET_RELATIVE_DIRECTIONS } from './directions';

const matchedDetailsKey = 'matched_details<first>';
const detailsByContainerKey = 'details_by_container<first>';
const detailsWithSharedContainersKey = 'details_with_shared_container<first>';
const detailsAcrossPerpendicularsKey = 'details_across_perpendiculars<detailFirst><containerFirst>';

export default class RecursiveDetail {
    constructor(detail, elevation) {
        Object.assign(
            this,
            detail,
            {
                class: RecursiveDetail,
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
                [detailsAcrossPerpendicularsKey]: {
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
    get refId() { return `Detail-${this.id}`; }
    get ref() { return document.getElementById(this.refId); }

    get _frame() { return this.elevation.allFrames.find(_frame => _frame.contains(this)); }
    get frameRefId() { return this._frame.refId; }
    get frameRef() { return this._frame.ref; }

    getContainerByDirection = first => this.elevation.containers[
        first ?
            this.firstContainerId || this.firstContainerFakeId
            :
            this.secondContainerId || this.secondContainerFakeId
    ];

    get firstContainer() { return this.getContainerByDirection(true); }
    get secondContainer() { return this.getContainerByDirection(false); }
    get bothContainers() { return [this.firstContainer, this.secondContainer]; }

    // ROUGH OPENING
    get exists() {
        return !!(
            (
                this.firstContainer
                &&
                !this.firstContainer.customRoughOpening
            )
            ||
            (
                this.secondContainer
                &&
                !this.secondContainer.customRoughOpening
            )
        );
    }

    // OPTIONS / TYPES
    get detailType() {
        // determine detail type
        return this.exists && (
            this.__type || (
                this.__type = this.vertical ?
                    (
                        this.firstContainer
                        &&
                        this.firstContainer.customRoughOpening
                        &&
                        this.secondContainer
                        &&
                        this.secondContainer.customRoughOpening
                    ) ?
                        'Mullion'
                        :
                        'Jamb'
                    :
                    (
                        this.firstContainer
                        &&
                        this.firstContainer.customRoughOpening
                    ) ?
                        (
                            this.secondContainer
                            &&
                            this.secondContainer.customRoughOpening
                        ) ?
                            'Horizontal'
                            :
                            'Head'
                        :
                        'Sill'
            )
        );
    }

    get configurationTypes() {
        if (!this.exists) return [];
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
        return this._detailOptionValues;
    }

    compareOtherDetail = detail => (
        this.exists
        &&
        this.detailType === detail.detailType
        &&
        this.appliedConfigurationTypes.every(act => detail.appliedConfigurationTypes.includes(act))
        &&
        this.appliedOptionValues.every(aov => detail.appliedOptionValues.includes(aov))
    );

    get detailId() {
        return this.exists && (
            this.__detailId || (
                this.__detailId = `${
                this.detailType === 'Horizontal' ?
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
        if (!this.exists) return [];

        if (!this[detailsByContainerKey][first]) {
            const direction = [!this.vertical, first];

            const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);

            const container = this.getContainerByDirection(first);

            this[detailsByContainerKey][first] = container && !container.customRoughOpening ?
                container.getDetailsByDirection(...BACKWARD)
                :
                [];
        }
        return this[detailsByContainerKey][first];
    }

    getDetailsWithSharedContainersByContainerDirection = first => {
        if (!this.exists) return [];

        if (!this[detailsWithSharedContainersKey][first]) {
            const { vertical } = this;

            const details = this.getDetailsByContainer(first);

            const {
                0: firstDetail,
                [details.length - 1]: lastDetail,
            } = details;

            this[detailsWithSharedContainersKey][first] = unique(
                !firstDetail || firstDetail === this ?
                    []
                    :
                    firstDetail.getDetailsWithSharedContainersByContainerDirection(!first),
                details,
                !lastDetail || lastDetail === this ?
                    []
                    :
                    lastDetail.getDetailsWithSharedContainersByContainerDirection(!first),
            ).sort(sortDetails(!vertical));

        }
        return this[detailsWithSharedContainersKey][first];
    }

    get allDetailsWithSharedContainers() {
        if (!this.exists) return [];

        return unique(
            this.getDetailsWithSharedContainersByContainerDirection(true),
            this.getDetailsWithSharedContainersByContainerDirection(false),
        )
            .sort(sortDetails(true))
            .sort(sortDetails(false));
    }

    get runsAlongEdgeOfRoughOpening() {
        return (
            !this.exists
            ||
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

        if (this.__shouldRunThroughPerpendiculars === undefined) {
            this.__shouldRunThroughPerpendiculars = (
                this.vertical
                ||
                (
                    this.runsAlongEdgeOfRoughOpening
                    &&
                    !this.elevation.verticalFramesRunThroughHeadAndSill
                )
            );
        }
        return this.__shouldRunThroughPerpendiculars;
    }

    getDetailsAcrossPerpendicularsByDirectionAndContainerDirection = (detailFirst, containerFirst) => {
        if (!this.exists) return [];

        if (!this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst]) {
            // console.log(this.id, detailFirst, containerFirst);
            const { vertical } = this;

            const containerDirection = [!vertical, containerFirst];

            const detailDirection = [vertical, detailFirst];

            const {
                BACKWARD: cBACKWARD,
            } = GET_RELATIVE_DIRECTIONS(containerDirection);

            const {
                FORWARD: dFORWARD,
                BACKWARD: dBACKWARD,
            } = GET_RELATIVE_DIRECTIONS(detailDirection);

            const container = this.getContainerByDirection(containerFirst);

            const adjacentContainer = container
                &&
                !container.customRoughOpening
                &&
                container.getFirstOrLastContainerByDirection(...dFORWARD, containerFirst);

            const sameContainer = adjacentContainer
                &&
                !adjacentContainer.customRoughOpening
                &&
                adjacentContainer.getFirstOrLastContainerByDirection(...dBACKWARD, containerFirst);

            if (sameContainer && container === sameContainer) {
                const detail = adjacentContainer.getFirstOrLastDetailByDirection(...cBACKWARD, !detailFirst);

                // console.log(this.id, detailFirst, containerFirst, {
                //     sameContainer,
                //     container,
                //     adjacentContainer,
                //     detail,
                //     cBACKWARD,
                //     dFORWARD,
                //     dBACKWARD,
                // });

                this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst] = detail ?
                    detail.getMatchedDetailsByDirection(detailFirst)
                    :
                    [];
            } else {
                this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst] = [];
            }
        }
        return this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst];
    }

    getDetailsAcrossPerpendicularsByDirection = detailFirst => this.exists ?
        unique(
            this.getDetailsAcrossPerpendicularsByDirectionAndContainerDirection(detailFirst, true),
            this.getDetailsAcrossPerpendicularsByDirectionAndContainerDirection(detailFirst, false),
        )
        :
        [];

    // get allDetailsAcrossPerpendiculars() {
    //     return this.__allDetailsAcrossPerpendiculars || (
    //         this.__allDetailsAcrossPerpendiculars = unique(
    //             this.getDetailsAcrossPerpendicularsByDirection(true),
    //             this.getDetailsAcrossPerpendicularsByDirection(false),
    //         )
    //     );
    // }

    getMatchedDetailsByDirection = first => {
        // console.log(this.id, first);
        const {
            shouldRunThroughPerpendiculars,
            allDetailsWithSharedContainers,
            allDetailsWithSharedContainers: {
                length,
            },
            exists,
        } = this;

        if (!exists) return [];

        const {
            [first ? 0 : length - 1]: detail,
        } = allDetailsWithSharedContainers;

        // console.log("GETTING DETAILS ACROSS PERPENDICULAR");
        // console.log("STARTING AT DETAIL: " + detail.id);
        // console.log("GOING IN DIRECTION: " + first);

        // console.log({ allDetailsWithSharedContainers, detail });

        const detailsAcrossPerpendiculars = shouldRunThroughPerpendiculars ?
            detail.getDetailsAcrossPerpendicularsByDirection(first)
            :
            [];

        return first ?
            unique(
                detailsAcrossPerpendiculars,
                allDetailsWithSharedContainers,
            )
            :
            unique(
                allDetailsWithSharedContainers,
                detailsAcrossPerpendiculars,
            );
    }

    get allMatchedDetails() {
        if (!this.__allMatchedDetails) {
            // console.log("GETTING MATCHED DETAILS: " + this.id);
            this.__allMatchedDetails = this.exists ?
                unique(
                    this.getMatchedDetailsByDirection(true),
                    this.getMatchedDetailsByDirection(false),
                )
                :
                [];
        }
        return this.__allMatchedDetails;
    }

    // PLACEMENT
    get placement() {
        if (!this.exists) return {};
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
