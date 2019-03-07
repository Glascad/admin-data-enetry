
const detailsKey = 'details[vertical][first]';
const containersKey = 'containers[vertical][first]';
const allContainersKey = 'allContainers[vertical][first]';

/**
 * Directions: [vertical][first]
 * 
 * vertical = [|||]
 * !vertical = [---]
 * 
 * first = [<<<] or [vvv]
 * !first = [>>>] or [^^^]
 * 
 *              [false][false]
 *                [second]
 *               ///
 *            ///
 *         ///
 *     [first]
 * [true][true]
 * 
 * Up = [vertical][first] = [|||][^^^] = [false][false]
 * Down = [vertical][!first] = [|||][vvv] = [false][true]
 * Left = [!vertical][!first] = [---][<<<] = [true][true]
 * Right = [!vertical][first] = [---][>>>] = [true][false]
 */

const DIRECTIONS = {
    UP: [true, false],
    DOWN: [true, true],
    LEFT: [false, true],
    RIGHT: [false, false],
};

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;

export default class RecursiveContainer {

    static sortContainers(vertical) {
        return function sort(a, b) {
            const beforeA = a._getAllContainersByDirection(!vertical, true);
            const beforeB = b._getAllContainersByDirection(!vertical, true);
            // a comes before b because b is upward or rightward of a
            if (beforeB.includes(a)) {
                // console.log(`${a.id} is before ${b.id}`);
                return -1;
            }
            // b comes before a because a is upward or rightward of a
            else if (beforeA.includes(b)) {
                // console.log(`${b.id} is before ${a.id}`);
                return 1;
            }
            // otherwise we need to compare offsets
            else {
                const key = vertical ? 'x' : 'y';

                const [
                    {
                        [key]: offsetA = 0,
                    } = {},
                    {
                        [key]: offsetB = 0,
                    } = {}
                ] = [beforeA, beforeB]
                    .map(before => before
                        .find(({ bottomLeftOffset: { [key]: offset } = {} }) => offset));

                if (offsetA < offsetB) {
                    // console.log(`${a.id} is before ${b.id}`);
                    return -1;
                }
                else if (offsetA > offsetB) {
                    // console.log(`${b.id} is before ${a.id}`);
                    return 1;
                }
                else {
                    // console.log(`${a.id} is equal to ${b.id}`);
                    return 0;
                }
            }
        }
    }

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
                }
            },
        );
    }

    get ref() { return document.querySelector(`#Container-${this.id}`); }

    _getDetails(vertical, first) {
        return this[detailsKey][vertical][first] || (
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
                    )
                )));
    }

    _getImmediateContainersByDirection(vertical, first) {
        return this[containersKey][vertical][first] || (
            this[containersKey][vertical][first] = this._getDetails(vertical, first)
                .reduce((details, detail) => details
                    .concat(detail._getContainer(first)),
                    [])
                .filter(Boolean)
                .sort(RecursiveContainer.sortContainers(vertical, first)));
    }

    _getAllContainersByDirection(vertical, first) {
        return this[allContainersKey][vertical][first] || (
            this[allContainersKey][vertical][first] = this._getImmediateContainersByDirection(vertical, first)
                .reduce((all, container) => Array.from(new Set(all
                    .concat([container]
                        .concat(container._getAllContainersByDirection(vertical, first))))),
                    []));
    }

    // details
    get leftDetails() { return this._getDetails(...LEFT); }
    get rightDetails() { return this._getDetails(...RIGHT); }
    get topDetails() { return this._getDetails(...UP); }
    get bottomDetails() { return this._getDetails(...DOWN); }

    // containers
    get leftContainers() { return this._getImmediateContainersByDirection(...LEFT); }
    get rightContainers() { return this._getImmediateContainersByDirection(...RIGHT); }
    get topContainers() { return this._getImmediateContainersByDirection(...UP); }
    get bottomContainers() { return this._getImmediateContainersByDirection(...DOWN); }

    get allLeftContainers() { return this._getAllContainersByDirection(...LEFT); }
    get allRightContainers() { return this._getAllContainersByDirection(...RIGHT); }
    get allTopContainers() { return this._getAllContainersByDirection(...UP); }
    get allBottomContainers() { return this._getAllContainersByDirection(...DOWN); }

    get placement() {
        return this.__placement || (
            this.__placement = {
                id: this.id,
                height: this.daylightOpening.y,
                width: this.daylightOpening.x,
                x: this.elevation.sightline + (
                    (
                        (this.bottomLeftOffset || 0)
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
                y: this.elevation.sightline + (
                    (
                        (this.bottomLeftOffset || 0)
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
    }
}
