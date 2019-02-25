
export class RecursiveElevation {
    constructor({
        _elevationContainers = [],
        _containerDetails = [],
    } = {}) {

        const containersById = this.containersById = _elevationContainers
            .reduce((byId, container) => ({
                ...byId,
                [container.id]: container,
            }), {});

        Object.assign(
            this,
            {
                _elevationContainers,
                _containerDetails,
            },
            Object.entries(containersById)
                .reduce((elevation, [id, container]) => ({
                    ...elevation,
                    [id]: new RecursiveContainer(container, this),
                }), {}),
        );
    }
}

const framesKey = 'frames[vertical][first]';
const containersKey = 'containers[vertical][first]';

class RecursiveContainer {
    constructor(container, elevation) {
        Object.assign(
            this,
            container,
            {
                elevation,
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
            },
        );
    }

    getFrames(vertical, first) {
        return this[framesKey][vertical][first] || (
            this[framesKey][vertical][first] = this.elevation._containerDetails
                .filter(({
                    firstContainerId,
                    secondContainerId,
                    vertical: frameVertical,
                }) => vertical === frameVertical && (
                    (
                        first
                        &&
                        firstContainerId === this.id
                    ) || (
                        !first
                        &&
                        secondContainerId === this.id
                    )
                ))
                .map(frame => ({
                    ...frame,
                    getContainers(first) {
                        return this.elevation[
                            first ?
                                frame.firstContainerId
                                :
                                frame.secondContainerId
                        ];
                    }
                }))
        );
    }

    getContainers(vertical, first) {
        return this[containersKey][vertical][first] || (
            this[containersKey][vertical][first] = this.getFrames(vertical, first)
                .reduce((frames, frame) => frames
                    .concat(frame.getContainers(!first)),
                    [])
        );
    }

    // frames
    getLeftFrames = () => this.getFrames(true, false);

    getRightFrames = () => this.getFrames(true, true);

    getTopFrames = () => this.getFrames(false, true);

    getBottomFrames = () => this.getFrames(false, false);

    // containers
    getLeftContainers = () => this.getContainers(true, false);

    getRightContainers = () => this.getContainers(true, true);

    getTopContainers = () => this.getContainers(false, true);

    getBottomContainers = () => this.getContainers(false, false);
}

// export default function recurseElevation({
//     _elevationContainers = [],
//     _containerDetails = [],
// } = {}) {

//     const containersById = _elevationContainers
//         .reduce((byId, container) => ({
//             ...byId,
//             [container.id]: container,
//         }), {});

//     const recursiveElevation = Object.entries(containersById)
//         .reduce((elevation, [id, container]) => ({
//             ...elevation,
//             [id]: {
//                 ...container,
//                 // utility methods
//                 getFrames(vertical, first) {
//                     const verticalFrames = this.getFrames[vertical] || {};
//                     if (!verticalFrames) {
//                         this.getFrames[vertical] = verticalFrames;
//                     }
//                     const firstFrames = verticalFrames[first];
//                     if (firstFrames) {
//                         return firstFrames;
//                     } else {
//                         const frames = _containerDetails
//                             .filter(({
//                                 firstContainerId,
//                                 secondContainerId,
//                                 vertical: frameVertical,
//                             }) => vertical === frameVertical && (
//                                 (
//                                     first
//                                     &&
//                                     id === `${firstContainerId}`
//                                 ) || (
//                                     !first
//                                     &&
//                                     id === `${secondContainerId}`
//                                 )
//                             ))
//                             .map(frame => ({
//                                 ...frame,
//                                 getContainers(first) {
//                                     return recursiveElevation[
//                                         first ?
//                                             frame.firstContainerId
//                                             :
//                                             frame.secondContainerId
//                                     ];
//                                 }
//                             }));
//                         verticalFrames[first] = frames;
//                         return frames;
//                     }
//                 },
//                 getContainers(vertical, first) {
//                     return this.getFrames(vertical, first)
//                         .reduce((frames, frame) => frames
//                             .concat(frame.getContainers(!first)),
//                             []);
//                 },
//                 // frames
//                 getLeftFrames() {
//                     const leftFrames = this.getFrames(true, false);
//                     this.getLeftFrames = () => leftFrames;
//                     return leftFrames;
//                 },
//                 getRightFrames() {
//                     const rightFrames = this.getFrames(true, true);
//                     this.getRightFrames = () => rightFrames;
//                     return rightFrames;
//                 },
//                 getTopFrames() {
//                     const topFrames = this.getFrames(false, true);
//                     this.getTopFrames = () => topFrames;
//                     return topFrames;
//                 },
//                 getBottomFrames() {
//                     const bottomFrames = this.getFrames(false, false);
//                     this.getBottomFrames = () => bottomFrames;
//                     return bottomFrames;
//                 },
//                 // containers
//                 getLeftContainers() {
//                     const leftContainers = this.getContainers(true, false);
//                     this.getLeftContainers = () => leftContainers;
//                     return leftContainers;
//                 },
//                 getRightContainers() {
//                     const rightContainers = this.getContainers(true, true);
//                     this.getRightContainers = () => rightContainers;
//                     return rightContainers;
//                 },
//                 getTopContainers() {
//                     const topContainers = this.getContainers(false, true);
//                     this.getTopContainers = () => topContainers;
//                     return topContainers;
//                 },
//                 getBottomContainers() {
//                     const bottomContainers = this.getContainers(false, false);
//                     this.getBottomContainers = () => bottomContainers;
//                     return bottomContainers;
//                 },
//             },
//         }), {});

//     window.temp1 = recursiveElevation;

//     return recursiveElevation;
// }