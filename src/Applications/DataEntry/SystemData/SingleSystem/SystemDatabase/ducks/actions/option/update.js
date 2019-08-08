// import { option as defaultSystemOption } from '../../default';

// export default ({
//     system,
//     system: {
//         systemOptions,
//     }
// }, {
//     optionId,
//     ...update
// }) => {
//     // console.log(arguments);
//     // Object.keys(update).forEach(_validateKey);
//     // find option in state
//     const option = systemOptions
//         .find(({ id }) => id === optionId);
//     if (option) {
//         const optionIndex = systemOptions
//             .indexOf(option);
//         // update key on option in state
//         return {
//             system: {
//                 ...system,
//                 systemOptions: systemOptions
//                     .replace(optionIndex, {
//                         ...option,
//                         ...update,
//                     }),
//             },
//         };
//     } else {
//         // add option to state
//         return {
//             system: {
//                 ...system,
//                 systemOptions: systemOptions
//                     .concat({
//                         ...defaultSystemOption,
//                         id: optionId,
//                         ...update,
//                     }),
//             },
//         };
//     }
// }