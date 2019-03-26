
import { unique } from '../../../../../../utils';
import { sortDetails } from './sort-details';
import { GET_RELATIVE_DIRECTIONS } from './directions';

const matchedDetailsKey = 'matched_details<first>';
const detailsByContainerKey = 'details_by_container<first>';
const detailsWithSharedContainersKey = 'details_with_shared_container<first>';
const detailsAcrossPerpendicularsKey = 'details_across_perpendiculars<detailFirst><containerFirst>';

// REMOVE LATER
var PROTECTION = Infinity;

export default class RecursiveDetail {
    constructor(rawDetail, elevation) {
        Object.assign(
            this,
            rawDetail,
            {
                rawDetail,
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

    get frame() { return this.elevation.allFrames.find(_frame => _frame.contains(this)); }
    get frameRefId() { return this.frame.refId; }
    get frameRef() { return this.frame.ref; }

    _getContainerByDirection = first => this.elevation.containers[
        first ?
            this.firstContainerId || this.firstContainerFakeId
            :
            this.secondContainerId || this.secondContainerFakeId
    ];

    get firstContainer() { return this._getContainerByDirection(true); }
    get secondContainer() { return this._getContainerByDirection(false); }
    get bothContainers() { return [this.firstContainer, this.secondContainer]; }

    // OPTIONS / TYPES
    get detailType() {
        // determine detail type
        return this.__type || (
            this.__type = this.vertical ?
                this.firstContainer && this.secondContainer ?
                    'Mullion'
                    :
                    'Jamb'
                :
                this.firstContainer ?
                    this.secondContainer ?
                        'Horizontal'
                        :
                        'Head'
                    :
                    'Sill'
        );
    }

    get configurationTypes() {
        // find all configuration types that are applicable to detail type
        return this.__configurationTypes || (
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

    _compareOtherDetail = detail => (
        this.detailType === detail.detailType
        &&
        this.appliedConfigurationTypes.every(act => detail.appliedConfigurationTypes.includes(act))
        &&
        this.appliedOptionValues.every(aov => detail.appliedOptionValues.includes(aov))
    );

    get detailId() {
        return this.__detailId || (
            this.__detailId = `${
            this.detailType === 'Horizontal' ?
                'HZ'
                :
                this.detailType[0].toUpperCase()
            }${
            this.elevation.allDetails
                .reduce(({ num, finished }, detail) => (
                    finished || detail === this ?
                        { num, finished: true }
                        :
                        detail.detailType === this.detailType ?
                            this._compareOtherDetail(detail) ?
                                { num }
                                :
                                { num: num + 1 }
                            :
                            { num }
                ), { num: 1 })
                .num
            }`
        );
    }

    // NAVIGATION / RENDERING
    _getDetailsByContainer = first => {
        if (!this[detailsByContainerKey][first]) {
            const direction = [!this.vertical, first];

            const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);

            const container = this._getContainerByDirection(first);

            this[detailsByContainerKey][first] = container ?
                container._getDetailsByDirection(...BACKWARD)
                :
                [];
        }
        return this[detailsByContainerKey][first];
    }

    _getDetailsWithSharedContainersByContainerDirection = first => {
        if (!this[detailsWithSharedContainersKey][first]) {
            const { vertical } = this;

            const details = this._getDetailsByContainer(first);

            const {
                0: firstDetail,
                [details.length - 1]: lastDetail,
            } = details;

            this[detailsWithSharedContainersKey][first] = unique(
                !firstDetail || firstDetail === this ?
                    []
                    :
                    firstDetail._getDetailsWithSharedContainersByContainerDirection(!first),
                details,
                !lastDetail || lastDetail === this ?
                    []
                    :
                    lastDetail._getDetailsWithSharedContainersByContainerDirection(!first),
            ).sort(sortDetails(!vertical));

        }
        return this[detailsWithSharedContainersKey][first];
    }

    get allDetailsWithSharedContainers() {
        return unique(
            this._getDetailsWithSharedContainersByContainerDirection(true),
            this._getDetailsWithSharedContainersByContainerDirection(false),
        )
            .sort(sortDetails(true))
            .sort(sortDetails(false));
    }

    get runsAlongEdgeOfRoughOpening() {
        return (
            !this.firstContainer
            ||
            !this.secondContainer
        );
    }

    get shouldRunThroughPerpendiculars() {
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

    _getDetailsAcrossPerpendicularsByDirectionAndContainerDirection = (detailFirst, containerFirst) => {
        if ((--PROTECTION > 0) && !this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst]) {
            console.log(this.id, detailFirst, containerFirst);
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

            const container = this._getContainerByDirection(containerFirst);

            const adjacentContainer = container
                &&
                container._getFirstOrLastContainerByDirection(...dFORWARD, containerFirst);

            const sameContainer = adjacentContainer
                &&
                adjacentContainer._getFirstOrLastContainerByDirection(...dBACKWARD, containerFirst);

            if (sameContainer && container === sameContainer) {
                const detail = adjacentContainer._getFirstOrLastDetailByDirection(...cBACKWARD, !detailFirst);

                console.log(this.id, detailFirst, containerFirst, {
                    sameContainer,
                    container,
                    adjacentContainer,
                    detail,
                    cBACKWARD,
                    dFORWARD,
                    dBACKWARD,
                });

                this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst] = detail ?
                    detail._getMatchedDetailsByDirection(detailFirst)
                    :
                    [];
            } else {
                this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst] = [];
            }
        }
        return this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst];
    }

    _getDetailsAcrossPerpendicularsByDirection = detailFirst => unique(
        this._getDetailsAcrossPerpendicularsByDirectionAndContainerDirection(detailFirst, true),
        this._getDetailsAcrossPerpendicularsByDirectionAndContainerDirection(detailFirst, false),
    );

    // get allDetailsAcrossPerpendiculars() {
    //     return this.__allDetailsAcrossPerpendiculars || (
    //         this.__allDetailsAcrossPerpendiculars = unique(
    //             this._getDetailsAcrossPerpendicularsByDirection(true),
    //             this._getDetailsAcrossPerpendicularsByDirection(false),
    //         )
    //     );
    // }

    _getMatchedDetailsByDirection = first => {
        console.log(this.id, first);
        const {
            shouldRunThroughPerpendiculars,
            allDetailsWithSharedContainers,
            allDetailsWithSharedContainers: {
                length,
            },
        } = this;

        const {
            [first ? 0 : length - 1]: detail,
        } = allDetailsWithSharedContainers;
        
        console.log("GETTING DETAILS ACROSS PERPENDICULAR");
        console.log("STARTING AT DETAIL: " + detail.id);
        console.log("GOING IN DIRECTION: " + first);
        
        console.log({ allDetailsWithSharedContainers, detail });
        
        const detailsAcrossPerpendiculars = shouldRunThroughPerpendiculars ?
            detail._getDetailsAcrossPerpendicularsByDirection(first)
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
            console.log("GETTING MATCHED DETAILS: " + this.id);
            this.__allMatchedDetails = unique(
                this._getMatchedDetailsByDirection(true),
                this._getMatchedDetailsByDirection(false),
            );
        }
        return this.__allMatchedDetails;
    }

    // ACTIONS
    actions__merge = (mergedContainerId, containerId) => {
        const { rawDetail } = this;

        const mergedContainer = this.bothContainers.find(({ id } = {}) => id === mergedContainerId);

        const first = mergedContainer === this.firstContainer;

        const removeOldKeys = first ? {
            firstContainerId: undefined,
            firstContainerFakeId: undefined,
        } : {
                secondContainerId: undefined,
                secondContainerFakeId: undefined,
            };

        const addNewKey = first ?
            typeof containerId === 'number' ?
                {
                    firstContainerId: containerId,
                } : {
                    firstContainerFakeId: containerId,
                }
            :
            typeof containerId === 'number' ?
                {
                    secondContainerId: containerId,
                } : {
                    secondContainerFakeId: containerId,
                };

        console.log("MERGING DETAIL: " + this.id);

        console.log({
            detail: this,
            rawDetail,
            mergedContainer,
            mergedContainerId,
            containerId,
            first,
            removeOldKeys,
            addNewKey,
        });

        return {
            ...rawDetail,
            ...removeOldKeys,
            ...addNewKey,
        };
    }
}
