
import { unique } from '../../../../../utils';
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
        );
    }

    get shouldRunThroughPerpendiculars() {
        return this.__shouldRunThroughPerpendiculars === undefined ? (
            this.__shouldRunThroughPerpendiculars = this.vertical
        ) : this.__shouldRunThroughPerpendiculars;
    }

    _getDetailsAcrossPerpendicularsByDirection = (detailFirst, containerFirst) => {

        if (!this[detailsAcrossPerpendicularsKey][detailFirst][containerFirst]) {
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

            const adjacentContainer = container && container._getFirstOrLastContainerByDirection(...dFORWARD);

            const sameContainer = adjacentContainer && adjacentContainer._getFirstOrLastContainerByDirection(...dBACKWARD, containerFirst);

            if (sameContainer && container === sameContainer) {

                const [detail] = adjacentContainer._getDetailsByDirection(...cBACKWARD);

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
        this._getDetailsAcrossPerpendicularsByDirection(detailFirst, true),
        this._getDetailsAcrossPerpendicularsByDirection(detailFirst, false),
    );

    get allDetailsAcrossPerpendiculars() {
        return this.__allDetailsAcrossPerpendiculars || (
            this.__allDetailsAcrossPerpendiculars = unique(
                this._getDetailsAcrossPerpendicularsByDirection(true),
                this._getDetailsAcrossPerpendicularsByDirection(false),
            )
        );
    }

    _getMatchedDetailsByDirection = first => {
        const {
            allDetailsWithSharedContainers,
            allDetailsWithSharedContainers: {
                [first ?
                    0
                    :
                    this.allDetailsWithSharedContainers.length - 1]: endDetail,
            },
        } = this;

        const detailsAcrossPerpendiculars = endDetail === this ?
            []
            :
            endDetail._getDetailsAcrossPerpendicularsByDirection(first);

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

            const firstMatchedDetails = this._getMatchedDetailsByDirection(true);
            const lastMatchedDetails = this._getMatchedDetailsByDirection(true);

            this.__allMatchedDetails = unique(
                firstMatchedDetails,
                lastMatchedDetails,
            );
        }
        return this.__allMatchedDetails;
    }
}
