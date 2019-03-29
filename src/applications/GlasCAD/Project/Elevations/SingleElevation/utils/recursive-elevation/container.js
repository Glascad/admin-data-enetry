
import { sortDetails } from './sort-details';
import { unique } from '../../../../../../../utils';
import { DIRECTIONS, GET_RELATIVE_DIRECTIONS } from './directions';
import _ from 'lodash';

const detailsKey = 'details<vertical><first>';
const framesKey = 'frames<vertical><first>';
const containersKey = 'containers<vertical><first>';
const allContainersKey = 'all_containers<vertical><first>';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;

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

    getDetailsByDirection = (vertical, first) => this[detailsKey][vertical][first] || (
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

    getFrameByDirection = (vertical, first) => this[framesKey][vertical][first] || (
        this[framesKey][vertical][first] = this.elevation.allFrames
            .find(_frame => _frame
                .contains(this.getDetailsByDirection(vertical, first)[0])));

    getImmediateContainersByDirection = (vertical, first) => this[containersKey][vertical][first] || (
        this[containersKey][vertical][first] = this.getDetailsByDirection(vertical, first)
            .reduce((details, detail) => details
                .concat(detail.getContainerByDirection(first) || []),
                []));

    getAllContainersByDirection = (vertical, first) => this[allContainersKey][vertical][first] || (
        this[allContainersKey][vertical][first] = this.getImmediateContainersByDirection(vertical, first)
            .reduce((all, container) => unique(all
                .concat([container]
                    .concat(container.getAllContainersByDirection(vertical, first)))),
                []));

    getFirstOrLastDetailByDirection = (vertical, first, last) => {
        const details = this.getDetailsByDirection(vertical, first);
        return details[last ?
            details.length - 1
            :
            0];
    }

    getFirstOrLastContainerByDirection = (vertical, first, last) => {
        const immediateContainers = this.getImmediateContainersByDirection(vertical, first);
        return immediateContainers[last ?
            immediateContainers.length - 1
            :
            0];
    }

    canMergeByDirection = (vertical, first) => {
        const immediateContainers = this.getImmediateContainersByDirection(vertical, first);
        const direction = [vertical, first];
        const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);
        return immediateContainers.length === 1
            &&
            immediateContainers[0].getImmediateContainersByDirection(...BACKWARD).length === 1;
    }

    // MERGING
    get canMergeLeft() { return this.canMergeByDirection(...LEFT); }
    get canMergeRight() { return this.canMergeByDirection(...RIGHT); }
    get canMergeUp() { return this.canMergeByDirection(...UP); }
    get canMergeDown() { return this.canMergeByDirection(...DOWN); }

    // DETAILS
    get leftDetails() { return this.getDetailsByDirection(...LEFT); }
    get rightDetails() { return this.getDetailsByDirection(...RIGHT); }
    get topDetails() { return this.getDetailsByDirection(...UP); }
    get bottomDetails() { return this.getDetailsByDirection(...DOWN); }

    // CONTAINERS
    get leftContainers() { return this.getImmediateContainersByDirection(...LEFT); }
    get rightContainers() { return this.getImmediateContainersByDirection(...RIGHT); }
    get topContainers() { return this.getImmediateContainersByDirection(...UP); }
    get bottomContainers() { return this.getImmediateContainersByDirection(...DOWN); }

    get allLeftContainers() { return this.getAllContainersByDirection(...LEFT); }
    get allRightContainers() { return this.getAllContainersByDirection(...RIGHT); }
    get allTopContainers() { return this.getAllContainersByDirection(...UP); }
    get allBottomContainers() { return this.getAllContainersByDirection(...DOWN); }

    // FRAMES
    get leftFrame() { return this.getFrameByDirection(...LEFT); }
    get rightFrame() { return this.getFrameByDirection(...RIGHT); }
    get topFrame() { return this.getFrameByDirection(...UP); }
    get bottomFrame() { return this.getFrameByDirection(...DOWN); }

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

        const [detailInBetween] = this.getDetailsByDirection(...FORWARD);
        const [mergedContainer] = this.getImmediateContainersByDirection(...FORWARD);

        console.log(`CONTAINER: ${this.id} MERGING CONTAINER: ${mergedContainer.id}`);

        const firstOrLastAdjacentContainers = [
            this.getFirstOrLastContainerByDirection(...RIGHT, !first),
            this.getFirstOrLastContainerByDirection(...LEFT, !first),
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

        const [mergedContainer] = this.getImmediateContainersByDirection(vertical, first);

        const newOriginal = mergedContainer.original || this.original;

        const { sightline } = this.getFrameByDirection(vertical, first);

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
