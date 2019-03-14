
import { unique } from '../../../../../utils';
import { sortDetails } from './sort-details';
import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from './directions';

const matchedDetailsKey = 'matched_details<first>';
const detailsByContainerKey = 'details_by_container<first>';
const detailsWithSharedContainersKey = 'details_with_shared_container<first>';

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
            },
        );
    }

    get refId() { return `Detail-${this.id}`; }

    get ref() { return document.getElementById(this.refId); }

    _getContainerByDirection = first => this.elevation.containers[
        first ?
            this.firstContainerId || this.firstContainerFakeId
            :
            this.secondContainerId || this.secondContainerFakeId
    ];

    _getDetailsByContainer = first => {
        if (!this[detailsByContainerKey][first]) {
            try {
                const direction = [!this.vertical, first];

                const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);

                const container = this._getContainerByDirection(first);
                console.log({ container, BACKWARD, direction });

                this[detailsByContainerKey][first] = container._getDetailsByDirection(...BACKWARD);
            } catch (e) {
                console.error(e);
            }
        }
        return this[detailsByContainerKey][first];
    }

    _getDetailsWithSharedContainersByContainerDirection = first => {
        if (!this[detailsWithSharedContainersKey][first]) {
            try {
                const { vertical } = this;

                const details = this._getDetailsByContainer(first);
                console.log({ details, first });

                const {
                    0: firstDetail,
                    [details.length - 1]: lastDetail,
                } = details;

                this[detailsWithSharedContainersKey][first] = unique(
                    firstDetail._getDetailsWithSharedContainersByContainerDirection(!first),
                    details,
                    lastDetail._getDetailsWithSharedContainersByContainerDirection(!first),
                ).sort(sortDetails(!vertical));

            } catch (e) {
                console.error(e);
            }
            // const container = this._getContainerByDirection(first);
            // console.log({ container });

            // if (container) {
            //     // console.log(container.ref);
            //     // const matched = container._getDetailsByDirection(!vertical, !first)
            //     // .reduce((all, detail) => detail === this ?
            //     //     all.concat(detail)
            //     //     :
            //     //     all.concat(detail, detail._getDetailsWithSharedContainersByContainerDirection(!first)),
            //     //     [])
            //     // .sort(sortDetails(!vertical));
            //     // const endMatched = container._getFirstOrLastContainerByDirection(!vertical, !first)
            //     // console.log({ matched });
            //     // console.log(matched.map(({ ref }) => ref));
            //     this[detailsWithSharedContainersKey][first] = matched;
            // } else {
            //     this[detailsWithSharedContainersKey][first] = [];
            // }
        }
        return this[detailsWithSharedContainersKey][first];
    }

    get detailsWithSharedContainers() {
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

    get frame() { return this.elevation.allFrames.find(_frame => _frame.contains(this)); }

    get frameRefId() { return this.frame.refId; }

    get frameRef() { return this.frame.ref; }

    // different `first` from `_getContainerByDirection`
    _getMatchedDetails = (first, alreadyMatched = []) => {
        // console.log(`getting matching details for first: ${
        //     this.firstContainerFakeId || this.firstContainerId
        //     } and second: ${
        //     this.secondContainerFakeId || this.secondContainerId
        //     } in direction ${
        //     this.vertical
        //     } ${
        //     first
        //     }`);

        // console.log({ alreadyMatched });
        // console.log(alreadyMatched.map(({ ref }) => ref));

        if (!this[matchedDetailsKey][first]) {

            const { vertical } = this;
            const detailsWithSharedContainers = [true, false]
                .reduce((matched, before) => {

                    const container = this._getContainerByDirection(before);
                    // console.log({ container });

                    if (container) {
                        // console.log(container.ref);
                        const matchingDetails = unique(matched, container
                            ._getDetailsByDirection(!vertical, !before));
                        // console.log({ matchingDetails });
                        // console.log(matchingDetails.map(({ ref }) => ref));
                        return unique(matched, matchingDetails);
                    }
                    return matched;
                }, unique(this, alreadyMatched));

            const detailsRunningThroughOtherDetails = [true, false]
                .reduce((matched, before) => {
                    const container = this._getContainerByDirection(before);
                    // console.log({ container });

                    if (container) {
                        // console.log(container.ref);
                        const matchingDetails = unique(matched, container
                            ._getDetailsByDirection(!vertical, !before));
                        // console.log({ matchingDetails });
                        // console.log(matchingDetails.map(({ ref }) => ref));

                        const adjacentContainer = container
                            ._getFirstOrLastContainerByDirection(vertical, first, before);
                        // console.log({ adjacentContainer });

                        if (adjacentContainer) {
                            // console.log(adjacentContainer.ref);
                            const sameContainer = adjacentContainer
                                ._getFirstOrLastContainerByDirection(vertical, !first, before);
                            // console.log({ sameContainer });
                            // if (sameContainer) console.log(sameContainer.ref);

                            if (sameContainer === container) {
                                // console.log("FOUND MATCHING CONTAINERS");
                                const otherMatchingDetails = adjacentContainer
                                    ._getDetailsByDirection(!vertical, !before)
                                    .reduce((all, detail) => unique(all, [detail], detail
                                        ._getMatchedDetails(first, matchingDetails)),
                                        matchingDetails);
                                // console.log({ otherMatchingDetails });
                                // console.log(otherMatchingDetails.map(({ ref }) => ref));

                                return unique(matched, otherMatchingDetails);
                            }
                        }
                        return matched;
                    }
                }, []);

            this[matchedDetailsKey][first] = unique(detailsWithSharedContainers, detailsRunningThroughOtherDetails);
        }
        return this[matchedDetailsKey][first];
    }

    // different `first` from `_getContainerByDirection`
    _getMatchedDetails = (first, alreadyMatched = []) => {

        const { vertical } = this;

        return this[matchedDetailsKey][first] || (
            this[matchedDetailsKey][first] = [true, false]
                .reduce((matched, before) => {

                    // CONTAINER BEFORE OR AFTER FRAME
                    const container = this._getContainerByDirection(before);
                    // console.log({ container });

                    if (container) {
                        // console.log(container.ref);
                        // ALL OTHER DETAILS OF CONTAINER
                        const matchingDetails = unique(matched, container
                            ._getDetailsByDirection(!vertical, !before));
                        // console.log({ matchingDetails });
                        // console.log(matchingDetails.map(({ ref }) => ref));

                        // CONTAINER ADJACENT TO FRAME'S CONTAINER (IN DIRECTION SPECIFIED)
                        const adjacentContainer = container
                            ._getFirstOrLastContainerByDirection(vertical, first, before);
                        // console.log({ adjacentContainer });

                        if (adjacentContainer) {
                            // console.log(adjacentContainer.ref);
                            // FIRST/LAST CONTAINER ADJACENT TO ADJACENT CONTAINER (IN OPPOSITE DIRECTION SPECIFIED)
                            const sameContainer = adjacentContainer
                                ._getFirstOrLastContainerByDirection(vertical, !first, before);
                            // console.log({ sameContainer });
                            // if (sameContainer) console.log(sameContainer.ref);

                            // SHOULD BE THE SAME AS THE CONTAINER ADJACENT TO FRAME
                            if (sameContainer === container) {
                                // console.log("FOUND MATCHING CONTAINERS");
                                // ALL OTHER DETAILS OF CONTAINER + MATCHED DETAILS
                                const otherMatchingDetails = adjacentContainer
                                    ._getDetailsByDirection(!vertical, !before)
                                    .reduce((all, detail) => unique(all, [detail], detail
                                        ._getMatchedDetails(first, matchingDetails)),
                                        matchingDetails);
                                // console.log({ otherMatchingDetails });
                                // console.log(otherMatchingDetails.map(({ ref }) => ref));

                                return unique(matched, otherMatchingDetails);
                            }
                        }
                    }
                    return matched;
                }, unique(this, alreadyMatched)));
    }

    get allMatchedDetails() {
        return this.__allMatchedDetails || (
            this.__allMatchedDetails = unique(...[true, false]
                .map(first => this._getMatchedDetails(first)))
        );
    }

    // get placement() {
    //     if (!this.__placement) {

    //         const {
    //             id,
    //             vertical,
    //             elevation: {
    //                 sightline,
    //             },
    //         } = this;

    //         if (vertical) {
    //             // FIRST CONTAINER
    //             const {
    //                 placement: {
    //                     id: firstId,
    //                     x: firstX = 0,
    //                     y: firstY = sightline,
    //                     height: firstHeight = 0,
    //                     width: firstWidth = 0,
    //                 } = {},
    //             } = this._getContainerByDirection(true) || {};

    //             // SECOND CONTAINER
    //             const {
    //                 placement: {
    //                     id: secondId,
    //                     x: secondX = sightline,
    //                     y: secondY = sightline,
    //                     height: secondHeight = 0,
    //                     width: secondWidth = 0,
    //                 } = {},
    //             } = this._getContainerByDirection(false) || {};

    //             const x = firstId ?
    //                 firstX + firstWidth
    //                 :
    //                 secondX - sightline;

    //             const y = Math.max(firstY, secondY);

    //             const height = !firstId ?
    //                 secondHeight
    //                 :
    //                 !secondId ?
    //                     firstHeight
    //                     :
    //                     Math.min(firstY + firstHeight, secondY + secondHeight) - y;

    //             const width = sightline;

    //             this.__placement = {
    //                 id,
    //                 firstId,
    //                 secondId,
    //                 vertical,
    //                 x,
    //                 y,
    //                 height,
    //                 width,
    //             };
    //         } else {
    //             // FIRST CONTAINER
    //             const {
    //                 placement: {
    //                     id: firstId,
    //                     x: firstX = sightline,
    //                     y: firstY = 0,
    //                     height: firstHeight = 0,
    //                     width: firstWidth = 0,
    //                 } = {},
    //             } = this._getContainerByDirection(true) || {};

    //             // SECOND CONTAINER
    //             const {
    //                 placement: {
    //                     id: secondId,
    //                     x: secondX = sightline,
    //                     y: secondY = sightline,
    //                     height: secondHeight = 0,
    //                     width: secondWidth = 0,
    //                 } = {},
    //             } = this._getContainerByDirection(false) || {};

    //             const x = Math.max(firstX, secondX);

    //             const y = firstId ?
    //                 firstY + firstHeight
    //                 :
    //                 secondY - sightline;

    //             const height = sightline;

    //             const width = !firstId ?
    //                 secondWidth
    //                 :
    //                 !secondId ?
    //                     firstWidth
    //                     :
    //                     Math.min(firstX + firstWidth, secondX + secondWidth) - x;

    //             this.__placement = {
    //                 id,
    //                 firstId,
    //                 secondId,
    //                 vertical,
    //                 x,
    //                 y,
    //                 height,
    //                 width,
    //             };
    //         }
    //     }
    //     return this.__placement;
    // }
}
