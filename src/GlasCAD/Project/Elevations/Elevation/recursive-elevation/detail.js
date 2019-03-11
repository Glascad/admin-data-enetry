
import { unique } from '../../../../../utils';

const matchedDetailsKey = 'matchedDetails[first]';

/**
 * The `first` in the `_getMatchedDetails()` is oriented in the *opposite* direction
 * as the `first` in `_getContainer()`.
 * 
 * For a `vertical` frame, `_getMatchedDetails(true)` indicates a `downward` direction,
 * while `_getMatchedDetails(false)` indicates an `upward` direction,
 * whereas `_getContainer(true)` indicates a `leftward` direction,
 * and `_getContainer(false)` indicates a `rightward` direction.
 */

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
            },
        );
    }

    get refId() { return `Detail-${this.id}`; }

    get ref() { return document.getElementById(this.refId); }

    // different `first` from `_getMatchedDetails`
    _getContainer = first => this.elevation.containers[
        first ?
            this.firstContainerId || this.firstContainerFakeId
            :
            this.secondContainerId || this.secondContainerFakeId];

    // different `first` from `_getContainer`
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

        const { vertical } = this;

        return this[matchedDetailsKey][first] || (
            this[matchedDetailsKey][first] = [true, false]
                .reduce((matched, before) => {

                    // CONTAINER BEFORE OR AFTER FRAME
                    const container = this._getContainer(before);
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
    //             } = this._getContainer(true) || {};

    //             // SECOND CONTAINER
    //             const {
    //                 placement: {
    //                     id: secondId,
    //                     x: secondX = sightline,
    //                     y: secondY = sightline,
    //                     height: secondHeight = 0,
    //                     width: secondWidth = 0,
    //                 } = {},
    //             } = this._getContainer(false) || {};

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
    //             } = this._getContainer(true) || {};

    //             // SECOND CONTAINER
    //             const {
    //                 placement: {
    //                     id: secondId,
    //                     x: secondX = sightline,
    //                     y: secondY = sightline,
    //                     height: secondHeight = 0,
    //                     width: secondWidth = 0,
    //                 } = {},
    //             } = this._getContainer(false) || {};

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
