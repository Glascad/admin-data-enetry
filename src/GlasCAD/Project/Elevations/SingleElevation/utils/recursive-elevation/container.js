
import { sortDetails } from './sort-details';
import { unique } from '../../../../../../utils';
import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from './directions';
import _ from 'lodash';

const detailsKey = 'details<vertical><first>';
const framesKey = 'frames<vertical><first>';
const containersKey = 'containers<vertical><first>';
const allContainersKey = 'all_containers<vertical><first>';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;

export default class RecursiveContainer {
    constructor(rawContainer, elevation) {
        Object.assign(
            this,
            rawContainer,
            {
                rawContainer,
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
                [allContainersKey]: {
                    true: {
                        true: undefined,
                        false: undefined,
                    },
                    false: {
                        true: undefined,
                        false: undefined,
                    },
                },
                [framesKey]: {
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
    get refId() { return `Container-${this.id}`; }

    get ref() { return document.getElementById(this.refId); }

    _getDetailsByDirection = (vertical, first) => this[detailsKey][vertical][first] || (
        this[detailsKey][vertical][first] = Object.values(this.elevation.details)
            .filter(({
                firstContainerId,
                secondContainerId,
                vertical: detailVertical,
            }) => vertical !== detailVertical && (
                this.id === (first ?
                    secondContainerId
                    :
                    firstContainerId
                )))
            .sort(sortDetails(vertical, first)));

    _getFrameByDirection = (vertical, first) => this[framesKey][vertical][first] || (
        this[framesKey][vertical][first] = this.elevation.allFrames
            .find(_frame => _frame
                .contains(this._getDetailsByDirection(vertical, first)[0])));

    _getImmediateContainersByDirection = (vertical, first) => this[containersKey][vertical][first] || (
        this[containersKey][vertical][first] = this._getDetailsByDirection(vertical, first)
            .reduce((details, detail) => details
                .concat(detail._getContainerByDirection(first) || []),
                []));

    _getAllContainersByDirection = (vertical, first) => this[allContainersKey][vertical][first] || (
        this[allContainersKey][vertical][first] = this._getImmediateContainersByDirection(vertical, first)
            .reduce((all, container) => unique(all
                .concat([container]
                    .concat(container._getAllContainersByDirection(vertical, first)))),
                []));

    _getFirstOrLastDetailByDirection = (vertical, first, last) => {
        const details = this._getDetailsByDirection(vertical, first);
        return details[last ?
            details.length - 1
            :
            0];
    }

    _getFirstOrLastContainerByDirection = (vertical, first, last) => {
        const immediateContainers = this._getImmediateContainersByDirection(vertical, first);
        return immediateContainers[last ?
            immediateContainers.length - 1
            :
            0];
    }

    _getCanMergeByDirection = (vertical, first) => {
        const immediateContainers = this._getImmediateContainersByDirection(vertical, first);
        const direction = [vertical, first];
        const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);
        return immediateContainers.length === 1
            &&
            immediateContainers[0]._getImmediateContainersByDirection(...BACKWARD).length === 1;
    }

    // MERGING
    get canMergeLeft() { return this._getCanMergeByDirection(...LEFT); }
    get canMergeRight() { return this._getCanMergeByDirection(...RIGHT); }
    get canMergeUp() { return this._getCanMergeByDirection(...UP); }
    get canMergeDown() { return this._getCanMergeByDirection(...DOWN); }

    // DETAILS
    get leftDetails() { return this._getDetailsByDirection(...LEFT); }
    get rightDetails() { return this._getDetailsByDirection(...RIGHT); }
    get topDetails() { return this._getDetailsByDirection(...UP); }
    get bottomDetails() { return this._getDetailsByDirection(...DOWN); }

    // CONTAINERS
    get leftContainers() { return this._getImmediateContainersByDirection(...LEFT); }
    get rightContainers() { return this._getImmediateContainersByDirection(...RIGHT); }
    get topContainers() { return this._getImmediateContainersByDirection(...UP); }
    get bottomContainers() { return this._getImmediateContainersByDirection(...DOWN); }

    get allLeftContainers() { return this._getAllContainersByDirection(...LEFT); }
    get allRightContainers() { return this._getAllContainersByDirection(...RIGHT); }
    get allTopContainers() { return this._getAllContainersByDirection(...UP); }
    get allBottomContainers() { return this._getAllContainersByDirection(...DOWN); }

    // FRAMES
    get leftFrame() { return this._getFrameByDirection(...LEFT); }
    get rightFrame() { return this._getFrameByDirection(...RIGHT); }
    get topFrame() { return this._getFrameByDirection(...UP); }
    get bottomFrame() { return this._getFrameByDirection(...DOWN); }

    // ALL
    get allDetails() {
        return [
            ...this.leftDetails,
            ...this.rightDetails,
            ...this.topDetails,
            ...this.bottomDetails,
        ];
    }
    get allContainers() {
        return [
            ...this.leftContainers,
            ...this.rightContainers,
            ...this.topContainers,
            ...this.bottomContainers,
        ];
    }
    get allFrames() {
        return [
            this.leftFrame,
            this.rightFrame,
            this.topFrame,
            this.bottomFrame,
        ];
    }

    // REFERENCES
    get detailRefs() { return this.allDetails.map(({ ref }) => ref); }
    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }
    get frameRefs() { return this.allFrames.map(({ ref }) => ref); }

    // PLACEMENT
    get placementX() {
        return this.__placementX || (
            this.__placementX = this.leftFrame.sightline + (
                (
                    this.bottomLeftOffset
                    &&
                    (this.bottomLeftOffset.x || 0)
                ) || (
                    this.leftContainers[0]
                    &&
                    (
                        (this.leftContainers[0].placement.x || 0)
                        +
                        (this.leftContainers[0].daylightOpening.x || 0)
                    )
                ) || 0
            )
        );
    }

    get placementY() {
        return this.__placementY || (
            this.__placementY = this.bottomFrame.sightline + (
                (
                    this.bottomLeftOffset
                    &&
                    (this.bottomLeftOffset.y || 0)
                ) || (
                    this.bottomContainers[0]
                    &&
                    (
                        (this.bottomContainers[0].placement.y || 0)
                        +
                        (this.bottomContainers[0].daylightOpening.y || 0)
                    )
                ) || 0
            )
        );
    }

    get placement() {
        return this.__placement || (
            this.__placement = {
                recursiveContainer: this,
                refId: this.refId,
                height: this.daylightOpening.y,
                width: this.daylightOpening.x,
                x: this.placementX,
                y: this.placementY,
            });
    }

    // ACTIONS
    getUpdatedDetailsToMergeByDirection = (vertical, first) => {
        const direction = [vertical, first];
        const { FORWARD, RIGHT, LEFT } = GET_RELATIVE_DIRECTIONS(direction);

        const [detailInBetween] = this._getDetailsByDirection(...FORWARD);
        const [mergedContainer] = this._getImmediateContainersByDirection(...FORWARD);

        const firstOrLastAdjacentContainers = [
            this._getFirstOrLastContainerByDirection(...RIGHT, !first),
            this._getFirstOrLastContainerByDirection(...LEFT, !first),
        ];

        const [
            detailsToMerge,
            detailsToDelete,
        ] = _.partition(mergedContainer.allDetails, detail => {
            if (detail === detailInBetween) return false;
            else {
                const {
                    vertical: detailVertical,
                    firstContainer,
                    secondContainer,
                } = detail;

                const otherContainer = firstContainer === mergedContainer ?
                    secondContainer
                    :
                    firstContainer;

                if (
                    detailVertical === vertical
                    &&
                    firstOrLastAdjacentContainers.includes(otherContainer)
                ) return false;

                else return true;
            }
        });

        return {
            detailsToMerge,
            detailsToDelete,
        };
    }

    getNewDLOToMergeByDirection = (vertical, first) => {
        const {
            daylightOpening: {
                x,
                y,
            },
        } = this;

        const [mergedContainer] = this._getImmediateContainersByDirection(vertical, first);

        const newOriginal = mergedContainer.original || this.original;

        const { sightline } = this._getFrameByDirection(vertical, first);

        const newDaylightOpening = vertical ? {
            x,
            y: y + sightline + mergedContainer.daylightOpening.y,
        } : {
                y,
                x: x + sightline + mergedContainer.daylightOpening.x,
            };

        return {
            newOriginal,
            mergedContainer,
            newDaylightOpening,
        };
    }

    actions__merge = (vertical, first) => ({
        ...this.getUpdatedDetailsToMergeByDirection(vertical, first),
        ...this.getNewDLOToMergeByDirection(vertical, first),
    });
}
