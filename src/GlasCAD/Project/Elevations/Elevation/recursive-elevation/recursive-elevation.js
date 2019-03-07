
import RecursiveContainer from './recursive-container';
import RecursiveDetail from './recursive-detail';

export default class RecursiveElevation {
    constructor({
        finishedFloorHeight = 0,
        roughOpening = {},
        _elevationContainers = [],
        _containerDetails = [],
        sightline = 10,
    } = {}) {

        // mark fake ids with underscores
        const containers = _elevationContainers
            .map(c => ({
                ...c,
                id: c.id || `_${c.fakeId}`,
            }));

        const details = _containerDetails
            .map(d => ({
                ...d,
                id: d.id || `_${d.fakeId}`,
                firstContainerId: d.firstContainerId || `_${d.firstContainerFakeId}`,
                secondContainerId: d.secondContainerId || `_${d.secondContainerFakeId}`,
            }));

        const detailsById = details
            .reduce((byId, detail) => ({
                ...byId,
                [detail.id]: detail,
            }), {});

        const containersById = containers
            .reduce((byId, container) => ({
                ...byId,
                [container.id]: container,
            }), {});

        Object.assign(
            this,
            {
                finishedFloorHeight,
                roughOpening,
                containers,
                sightline,
                detailIds: Object.keys(detailsById),
                containerIds: Object.keys(containersById),
                details: Object.entries(detailsById)
                    .reduce((all, [id, detail]) => ({
                        ...all,
                        [id]: new RecursiveDetail(detail, this),
                    }), {}),
                containers: Object.entries(containersById)
                    .reduce((all, [id, container]) => ({
                        ...all,
                        [id]: new RecursiveContainer(container, this),
                    }), {}),
            },
        );

        const [originalContainerId] = Object.entries(containersById)
            .find(([_, { original }]) => original) || [];

        this.originalContainer = this.containers[originalContainerId];
    }

    get containerRefs() { return this.containerIds.map(id => this.containers[id].ref); }
    get detailRefs() { return this.detailIds.map(id => this.details[id].ref); }

    get placedContainers() { return this.containerIds.map(id => this.containers[id].placement); }
    get placedDetails() { return this.detailIds.map(id => this.details[id].placement); }

    get placedFrames() {
        // const {
        //     sightline,
        //     placedDetails,
        // } = this;
        // return placedDetails
        //     .reduce(({
        //         all = [],
        //         removed = []
        //     },
        //         detail,
        //         i,
        //         otherDetails,
        //     ) => {

        //         const {
        //             vertical,
        //             x,
        //             y,
        //             height,
        //             width,
        //             id,
        //             firstId,
        //             secondId,
        //         } = detail;

        //         const matchedDetails = otherDetails.slice(i)
        //             .filter(d => matchDetails({
        //                 ...detail,
        //                 ids: [detail.id],
        //                 firstIds: [detail.firstId],
        //                 secondIds: [detail.secondId],
        //             }, d, sightline));

        //         const _frame = matchedDetails
        //             .reduce((_frame, d) => joinDetails(_frame, d, sightline), {
        //                 vertical,
        //                 x,
        //                 y,
        //                 height,
        //                 width,
        //                 ids: [id],
        //                 firstIds: [firstId],
        //                 secondIds: [secondId],
        //             });

        //         const existingFrame = all.find(f => matchDetails(_frame, detail, sightline));

        //         const existingFrameIndex = all.indexOf(existingFrame);

        //         return {
        //             all: existingFrame ?
        //                 all.replace(existingFrameIndex, joinDetails(existingFrame, _frame, _frame.sightline))
        //                 :
        //                 all.concat(_frame),
        //             removed: removed.concat(_frame.ids),
        //         };
        //     },
        //         {}).all;
    }
}

// const matchDetails = window.matchDetails = (_frame, detail, sightline) => (
//     // !console.log(_frame)
//     // &&
//     // !console.log(_frame.ids)
//     // &&
//     // !console.log(_frame.ids.includes)
//     // &&
//     // !console.trace(_frame)
//     // &&
//     _frame.vertical === detail.vertical
//     &&
//     !(_frame.ids.includes = function (val) {
//         for (let i = 0; i < this.length; i++){
//             if (this[i] === val) return true;
//         }
//         return false;
//     })
//     &&
//     _frame.ids.includes(detail.id)
//         (
//         (
//             _frame.firstIds.includes(detail.firstId)
//             ||
//             _frame.secondIds.includes(detail.secondId)
//         )
//             ||
//             detail.vertical ? (
//                 _frame.x === detail.x
//                 &&
//                 (
//                     _frame.y + _frame.height + sightline === detail.y
//                     ||
//                     detail.y + detail.height + sightline === _frame.y
//                 )
//             ) : (
//                 _frame.y === detail.y
//                 &&
//                 (
//                     _frame.x + _frame.width + sightline === detail.x
//                     ||
//                     detail.x + detail.width + sightline === _frame.x
//                 )
//             )
//         )
// );

// const joinDetails = (_frame, detail, sightline) => ({
//     ..._frame,
//     ...(_frame.vertical ?
//         {
//             x: _frame.x,
//             y: Math.min(_frame.y, detail.y),
//             height: _frame.height + sightline + detail.height,
//         }
//         :
//         {
//             x: Math.min(_frame.x, detail.x),
//             y: _frame.y,
//             width: _frame.width + sightline + detail.width,
//         }),
//     ids: _frame.ids.concat(detail.id),
//     firstIds: _frame.firstIds.concat(detail.firstId || detail.firstIds),
//     secondIds: _frame.secondIds.concat(detail.secondId || detail.secondIds),
// });
