import { DIRECTIONS, GET_RELATIVE_DIRECTIONS, Loggable, unique, match } from '../../../../../../../utils';
import sortDetails from './sort-details';
import CONTENT_TYPES from '../../../../../../../utils/objects/content_types';

const detailsKey = 'details<vertical><first>';
const framesKey = 'frames<vertical><first>';
const containersKey = 'containers<vertical><first>';
const allContainersKey = 'all_containers<vertical><first>';

const { UP, DOWN, LEFT, RIGHT } = DIRECTIONS;
const { GLASS, VOID_INTERNAL, VOID_LEFT_NOTCH, VOID_RIGHT_NOTCH, VOID_RAISED_CURB, VOID_STEPPED_HEAD } = CONTENT_TYPES


export default class RecursiveContainer extends Loggable {

    static instanceCount = 0;

    constructor(container, elevation) {
        super();
        Object.assign(
            this,
            container,
            {
                class: RecursiveContainer,
                instanceCount: ++RecursiveContainer.instanceCount,
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
    get refId() { return `Container-${this.id}<${this.instanceCount}>`; }

    get ref() { return document.getElementById(this.refId); }

    registerReactComponent = ReactComponent => this.__ReactComponent = ReactComponent;

    get ReactComponent() { return this.__ReactComponent; }

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
            .sort(sortDetails));

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
            this.__placementX = (
                this.leftFrame ?
                    this.leftFrame.sightline
                    :
                    // this.elevation.sightline
                    0
            ) + (
                this.leftContainers[0] ? (
                    (this.leftContainers[0].placement.x || 0)
                    +
                    (this.leftContainers[0].daylightOpening.dimensions.width || 0)
                )
                    :
                    0
            ) || 0
        );
    }

    get placementY() {
        return this.__placementY || (
            this.__placementY = (
                (this.bottomFrame && this.bottomFrame.sightline)
                ||
                // this.elevation.sightline
                // ||
                0
            ) + ((
                this.bottomContainers[0]
                &&
                (
                    (this.bottomContainers[0].placement.y || 0)
                    +
                    (this.bottomContainers[0].daylightOpening.dimensions.height || 0)
                )
            ) || 0)
        );
    }

    get placement() {
        const {
            daylightOpening: {
                dimensions: {
                    height,
                    width,
                } = {}
            } = {},
            placementX,
            placementY,
        } = this;
        return this.__placement || (
            this.__placement = {
                height,
                width,
                x: placementX,
                y: placementY,
            });
    }

    getPrecedenceByVertical = vertical => {
        const {
            placement: {
                x,
                y,
                height,
                width,
            },
        } = this;

        return vertical ?
            x + (width / 2)
            :
            y + (height / 2);
    }

    get precedence() {
        return {
            true: this.getPrecedenceByVertical(true),
            false: this.getPrecedenceByVertical(false),
        };
    }

    // ACTIONS

    // MERGE
    canMergeByDirection = (vertical, first, allowCustomRoughOpenings = false) => {

        // If it only has one container on that side, and if the placement x/y and width/height are the same
        if (!allowCustomRoughOpenings && this.contents !== CONTENT_TYPES.GLASS) return false;

        const placementKey = vertical ? 'x' : 'y'
        const DLOKey = vertical ? 'width' : 'height';

        const containersToBeMergedInto = this.getImmediateContainersByDirection(vertical, first);
        const {
            0: {
                placement,
                contents,
            } = {}
        } = containersToBeMergedInto;

        return !!(
            containersToBeMergedInto.length === 1
            &&
            placement[placementKey] === this.placement[placementKey]
            &&
            placement[DLOKey] === this.placement[DLOKey]
            &&
            (
                allowCustomRoughOpenings
                ||
                contents === GLASS
            )
        )



        // const direction = [vertical, first];
        // const { BACKWARD } = GET_RELATIVE_DIRECTIONS(direction);

        // const [container, ...otherContainers] = this.getImmediateContainersByDirection(vertical, first);

        // const backwardContainers = container && container.getImmediateContainersByDirection(...BACKWARD);


        // return !!(
        //     (
        //         // console.log({
        //         //     direction,
        //         //     container,
        //         //     otherContainers,
        //         //     backwardContainers,
        //         //     allowCustomRoughOpenings,
        //         //     thiss: this,
        //         // })
        //         // ||
        //         container
        //     )
        //     &&
        //     !otherContainers.length
        //     &&
        //     backwardContainers.length === 1
        //     &&
        //     (
        //         allowCustomRoughOpenings
        //         ||
        //         container.contents === CONTENT_TYPES.GLASS
        //     )
        //     &&
        //     container.daylightOpening.dimensions[DLOKey] === this.daylightOpening.dimensions[DLOKey]
        // );
    }

    get canMergeLeft() { return this.canMergeByDirection(...LEFT) };
    get canMergeRight() { return this.canMergeByDirection(...RIGHT) };
    get canMergeUp() { return this.canMergeByDirection(...UP) };
    get canMergeDown() { return this.canMergeByDirection(...DOWN) };

    canOverrideSightlineByDirection = (vertical, first) => {
        const containersByDirection = this.getImmediateContainersByDirection(vertical, first);

        return containersByDirection.length === 0 || (
            containersByDirection.length === 1
            &&
            !this.canMergeByDirection(vertical, first, true)
            &&
            containersByDirection[0].contents !== CONTENT_TYPES.GLASS
        )
    }

    get updatedContainerForDeletion() {
        return [UP, DOWN, LEFT, RIGHT]
            .reduce((updatedContainer, direction) => this.canOverrideSightlineByDirection(...direction) ?
                {
                    ...updatedContainer,
                    placement: {
                        ...updatedContainer.placement,
                        x: !direction[0] && direction[1] ?
                            updatedContainer.placement.x - this.leftFrame.sightline
                            :
                            updatedContainer.placement.x,
                        y: direction[0] && direction[1] ?
                            updatedContainer.placement.y - this.bottomFrame.sightline
                            :
                            updatedContainer.placement.y,
                        width: direction[0] ?
                            updatedContainer.placement.width
                            :
                            updatedContainer.placement.width + this.getFrameByDirection(...direction).sightline,
                        height: direction[0] ?
                            updatedContainer.placement.height + this.getFrameByDirection(...direction).sightline
                            :
                            updatedContainer.placement.height,
                    }
                }
                :
                updatedContainer
                , this)
    }

    canMergeOnDeleteByDirection(vertical, first) {
        const containerWithDeletedDLOAndPlacement = this.updatedContainerForDeletion;

        const placementKey = vertical ? 'x' : 'y'
        const DLOKey = vertical ? 'width' : 'height';

        const containersToBeMergedInto = this.getImmediateContainersByDirection(vertical, first);
        const {
            0: {
                placement,
            } = {}
        } = containersToBeMergedInto;

        const arg1 = containersToBeMergedInto.length === 1;
        const arg2 = placement[placementKey] === containerWithDeletedDLOAndPlacement.placement[placementKey];
        const arg3 = placement[DLOKey] === containerWithDeletedDLOAndPlacement.placement[DLOKey];
        console.log({
            placementKey,
            DLOKey,
            placement,
            updatedPlacement: containerWithDeletedDLOAndPlacement.placement,
            thisPlacement: this.placement,
            containersLength: containersToBeMergedInto.length,
            arg1,
            arg2,
            arg3,
        })

        return !!(arg1 && arg2 && arg3)

    }

    // DELETE
    get canDelete() {


        return [LEFT, RIGHT].every(direction => this.getImmediateContainersByDirection(...direction)
            .every(({ contents }) => contents.match(/VOID/i) ? this.canMergeOnDeleteByDirection(...direction, true) : true)
        ) && (
                (
                    // Raised Curb
                    this.bottomContainers.length === 0
                    ||
                    (
                        this.canMergeOnDeleteByDirection(true, true)
                        &&
                        this.bottomContainers[0].contents === VOID_RAISED_CURB
                    )
                )
                ||
                (
                    // Stepped Head
                    this.topContainers.length === 0
                    ||
                    (
                        this.canMergeOnDeleteByDirection(true, false)
                        &&
                        this.topContainers[0].contents === VOID_STEPPED_HEAD
                    )
                )
            )

        // TODO Cannot delete Bay

        // TODO: just allow rectangular deletion - account for merging with SL

        /**
         * FIRST STEP:
         *  FIND VOID_INTERNALS -
         *      - must be mergeable
         *      - opposite direction void must be mergable
         *      - perpendicular voids must be the same type as each other and opposite and opposite needs to be against RO
         *      - if opposite isn't void and perpendicular is, then item cannot be deleted
         * SECOND STEP:
         *  
         */

        // return [UP, DOWN, LEFT, RIGHT].every(direction => {
        //     const containersByDirection = this.getImmediateContainersByDirection(...direction);

        //     return containersByDirection.every(container => match(container.contents)
        //         .against({
        //             [GLASS]: true,
        //             [VOID_INTERNAL]: () => this.canMergeByDirection(...direction, true),
        //             // Can only delete if container can merge with Internal
        //             [VOID_STEPPED_HEAD]: () => (
        //                 this.topContainers.length === 0
        //                 ||
        //                 (
        //                     this.canMergeByDirection(true, false, true)
        //                     &&
        //                     this.topContainers[0].contents === VOID_STEPPED_HEAD
        //                 )
        //             ),
        //             [VOID_RAISED_CURB]: () => (
        //                 this.bottomContainers.length === 0
        //                 ||
        //                 (
        //                     this.canMergeByDirection(true, true, true)
        //                     &&
        //                     this.bottomContainers[0].contents === VOID_RAISED_CURB
        //                 )
        //             ),
        //             [VOID_LEFT_NOTCH]: () => (
        //                 this.leftContainers.length === 0
        //                 ||
        //                 (
        //                     this.canMergeByDirection(false, true, true)
        //                     &&
        //                     this.leftContainers[0].contents.match(/VOID/i)
        //                     &&
        //                     !this.topContainers[0].contents.match(/VOID/i)
        //                     &&
        //                     !this.bottomContainers[0].contents.match(/VOID/i)
        //                 )
        //             ),
        //             [VOID_RIGHT_NOTCH]: () => (
        //                 this.rightContainers.length === 0
        //                 ||
        //                 (
        //                     this.canMergeByDirection(false, false, true)
        //                     &&
        //                     this.rightContainers[0].contents.match(/VOID/i)
        //                     &&
        //                     !this.topContainers[0].contents.match(/VOID/i)
        //                     &&
        //                     !this.bottomContainers[0].contents.match(/VOID/i)
        //                 )
        //             ),
        //         })
        //     .otherwise(false)
        // )

        // })
    }

    // ADD INTERMEDIATE
    canAddIntermediateByVerticalAndDistance = (vertical, distance) => !!(
        distance >= this.minByVertical(vertical)
        &&
        distance <= this.maxByVertical(vertical)
    );

    getMinOrMaxByVertical = (vertical, min) => {
        const DLOKey = vertical ? 'width' : 'height';

        return min ?
            this.elevation.minimumDaylightOpening
            :
            this.daylightOpening.dimensions[DLOKey] - this.elevation.minimumDaylightOpening - this.elevation.sightline;
    }

    minByVertical = vertical => this.getMinOrMaxByVertical(vertical, true);
    maxByVertical = vertical => this.getMinOrMaxByVertical(vertical, false);

    get minDistanceForHorizontal() { return this.minByVertical(false) };
    get maxDistanceForHorizontal() { return this.minByVertical(false) };
    get minDistanceForVertical() { return this.minByVertical(true) };
    get maxDistanceForVertical() { return this.minByVertical(true) };

    canAddVerticalByDistance = distance => this.canAddIntermediateByVerticalAndDistance(true, distance);
    canAddHorizontalByDistance = distance => this.canAddIntermediateByVerticalAndDistance(false, distance);

    get canAddVertical() { return this.canAddIntermediateByVerticalAndDistance(true, this.elevation.minimumDaylightOpening); }
    get canAddHorizontal() { return this.canAddIntermediateByVerticalAndDistance(false, this.elevation.minimumDaylightOpening); }

    // ADD_BAY
    canAddBayByDirectionAndDistance = (first, distance) => !!(
        distance >= this.elevation.minimumDaylightOpening
        &&
        !this.getFrameByDirection(false, first).getRunsAlongEdgeOfRoughOpening(first)
        &&
        distance <= this.getFrameByDirection(false, first).maximumMovementByDirection(first)
        &&
        this.canAddBayByDirection(first)
    );

    canAddBayByDirection = first => this.getFrameByDirection(false, first).canAddBay;

    get canAddBayRight() { return this.canAddBayByDirection(false); }
    get canAddBayLeft() { return this.canAddBayByDirection(true); }
    get canAddBay() { return this.canAddBayRight || this.canAddBayLeft; }

    // STEP HEAD
    canAlterRoughOpeningByDirection = first => this.getFrameByDirection(true, first)
        .details.every(({ getContainerByDirection }) => !getContainerByDirection(first));

    get canStepHead() { return this.canAlterRoughOpeningByDirection(false); }
    get canRaiseCurb() { return this.canAlterRoughOpeningByDirection(true); }

    getMaxRoughOpeningDistanceByDirection = first => {
        if (this.canAlterRoughOpeningByDirection(first)) {
            const { sightline } = this.getFrameByDirection(true, first);
            return this.daylightOpening.dimensions.height + sightline;
        }
    }

    // GET CONTENTS TYPE
    getNewContentsType = () => this.bottomContainers.length === 0 ?
        CONTENT_TYPES.VOID_RAISED_CURB
        :
        this.topContainers.length === 0 ?
            CONTENT_TYPES.VOID_STEPPED_HEAD
            :
            this.rightContainers.length === 0 ?
                CONTENT_TYPES.VOID_RIGHT_NOTCH
                :
                this.leftContainers.length === 0 ?
                    CONTENT_TYPES.VOID_LEFT_NOTCH
                    :
                    CONTENT_TYPES.VOID_INTERNAL;
}
