
import { sortDetails } from './sort-details';
import { unique } from '../../../../../utils';
import { DIRECTIONS } from './directions';

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

    _getFirstOrLastContainerByDirection = (vertical, first, last) => {
        const immediateContainers = this._getImmediateContainersByDirection(vertical, first);
        return immediateContainers[last ?
            immediateContainers.length - 1
            :
            0];
    }

    // details
    get leftDetails() { return this._getDetailsByDirection(...LEFT); }
    get rightDetails() { return this._getDetailsByDirection(...RIGHT); }
    get topDetails() { return this._getDetailsByDirection(...UP); }
    get bottomDetails() { return this._getDetailsByDirection(...DOWN); }

    // containers
    get leftContainers() { return this._getImmediateContainersByDirection(...LEFT); }
    get rightContainers() { return this._getImmediateContainersByDirection(...RIGHT); }
    get topContainers() { return this._getImmediateContainersByDirection(...UP); }
    get bottomContainers() { return this._getImmediateContainersByDirection(...DOWN); }

    get allLeftContainers() { return this._getAllContainersByDirection(...LEFT); }
    get allRightContainers() { return this._getAllContainersByDirection(...RIGHT); }
    get allTopContainers() { return this._getAllContainersByDirection(...UP); }
    get allBottomContainers() { return this._getAllContainersByDirection(...DOWN); }

    // frames
    get leftFrame() { return this._getFrameByDirection(...LEFT); }
    get rightFrame() { return this._getFrameByDirection(...RIGHT); }
    get topFrame() { return this._getFrameByDirection(...UP); }
    get bottomFrame() { return this._getFrameByDirection(...DOWN); }

    // all
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

    // refs
    get detailRefs() { return this.allDetails.map(({ ref }) => ref); }
    get containerRefs() { return this.allContainers.map(({ ref }) => ref); }
    get frameRefs() { return this.allFrames.map(({ ref }) => ref); }

    get placement() {
        try {
            return this.__placement || (
                this.__placement = {
                    refId: this.refId,
                    height: this.daylightOpening.y,
                    width: this.daylightOpening.x,
                    x: this.leftFrame.sightline + (
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
                    ),
                    y: this.bottomFrame.sightline + (
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
                    ),
                });
        } catch (err) {
            console.log(this);
            console.error(err);
        }
    }
}
