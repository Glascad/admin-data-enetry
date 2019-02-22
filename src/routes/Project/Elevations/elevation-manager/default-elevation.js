
export const elevation = {};
export const elevationContainer = {};
export const container = {};

// const scaleFactor = 5;

// class ElevationContainer {
//     static id = 1;
//     constructor(config = {}) {
//         Object.assign(
//             this,
//             ElevationContainer.default,
//             {
//                 id: config.id || ElevationContainer.id++,
//                 daylightOpening: {
//                     x: 68 * scaleFactor,
//                     y: 68 * scaleFactor,
//                 },
//                 contents: {
//                     infillMaterial: "glass",
//                     infillSize: 1,
//                 },
//                 finishedFloorHeight: 0,
//                 containerDetails: []
//             },
//             config,
//         );
//     }
// }

// class Elevation {
//     static id = 1;
//     constructor({
//         id = Elevation.id++,
//         roughOpening = {
//             x: 72 * scaleFactor,
//             y: 72 * scaleFactor,
//         },
//         sightline = 2 * scaleFactor,
//         ...config,
//     } = {}) {
//         const container = new ElevationContainer({
//             roughOpening,
//             sightline,
//         });
//         Object.assign(
//             this,
//             {
//                 containers: [],
//             },
//         );
//     }
// }

// export const elevation = new Elevation();


// console.log({
//     elevation,
// });




// // class Frame {
// //     static id = 1;
// //     constructor({
// //         sightline,
// //         optionValues = [],
// //         vertical = false,
// //         original = false,
// //     }) {
// //         Object.assign(this, {
// //             id: Frame.id++,
// //             vertical,
// //             sightline,
// //             optionValues,
// //         }, original ? {
// //             x: 0,
// //             y: 0,
// //         } : {});
// //     }
// // };

// // class Lite {
// //     static id = 1;
// //     constructor({
// //         horizontalDaylightOpening,
// //         verticalDaylightOpening,
// //         sightline,
// //         original = false,
// //         ...frames
// //     }) {
// //         Object.assign(this,
// //             {
// //                 id: Lite.id++,
// //                 width: horizontalDaylightOpening,
// //                 height: verticalDaylightOpening,
// //             },
// //             original ? {
// //                 x: sightline,
// //                 y: sightline,
// //             } : {},
// //             frames,
// //         );
// //     }
// // }

// // class Elevation {
// //     static id = 1;
// //     static oppositeKeys = {
// //         leftFrame: 'rightLites',
// //         leftLite: 'rightFrame',
// //         rightFrame: 'leftLites',
// //         rightLite: 'leftFrame',
// //         topFrame: 'bottomLites',
// //         topLite: 'bottomFrame',
// //         bottomFrame: 'topLites',
// //         bottomLite: 'topFrame',
// //     };
// //     constructor({
// //         horizontalRoughOpening,
// //         verticalRoughOpening,
// //         sightline,
// //     }) {
// //         Object.assign(this, {
// //             id: Elevation.id++,
// //             width: horizontalRoughOpening,
// //             height: verticalRoughOpening,
// //             sightline: sightline,
// //             lites: [
// //                 new Lite({
// //                     horizontalDaylightOpening: horizontalRoughOpening - (sightline * 2),
// //                     verticalDaylightOpening: verticalRoughOpening - (sightline * 2),
// //                     sightline,
// //                     original: true,
// //                     leftFrame: new Frame({
// //                         sightline,
// //                         vertical: true,
// //                         original: true
// //                     }),
// //                     rightFrame: new Frame({
// //                         sightline,
// //                         vertical: true
// //                     }),
// //                     topFrame: new Frame({
// //                         sightline,
// //                     }),
// //                     bottomFrame: new Frame({
// //                         sightline,
// //                     }),
// //                 }),
// //             ],
// //         });
// //     }
// //     get litesById() {
// //         return this.lites.reduce((litesById, lite) => ({
// //             ...litesById,
// //             [lite.id]: lite,
// //         }), {});
// //     }
// //     get framesById() {
// //         return this.lites
// //             .reduce((framesById, lite) => (
// //                 Object.entries(lite)
// //                     .filter(([key]) => key.match(/Frame$/))
// //                     .reduce((framesById, [key, frame]) => ({
// //                         ...framesById,
// //                         [frame.id]: {
// //                             ...framesById[frame.id],
// //                             ...frame,
// //                             [Elevation.oppositeKeys[key]]: ((framesById[frame.id] || {}).lites || [])
// //                                 .concat({ key, ...lite }),
// //                         },
// //                     }), framesById)
// //             ), {});
// //     }
// //     // get renderableLites() {
// //     //     return this.lites.map();
// //     // }
// // };



// // export const elevation = new Elevation({
// //     horizontalRoughOpening: 72,
// //     verticalRoughOpening: 60,
// //     sightline: 2,
// // });

// // const {
// //     litesById,
// //     framesById,
// // } = elevation;

// // setTimeout(() => {
// //     console.log({
// //         elevation,
// //         litesById,
// //         framesById,
// //     });
// // });
