// import { option as defaultSystemOption } from '../../../default';

// export default ({
//     system,
//     system: {
//         systemOptions,
//     },
// }, {
//     optionId,
//     valueId,
//     ...value
// }) => {
//     // console.log(arguments);
//     // Object.keys(value).forEach(_validateKey)
//     // find option in state
//     const option = systemOptions
//         .find(({ id }) => id === optionId);
//     if (option) {
//         const optionIndex = systemOptions
//             .indexOf(option);
//         const { optionValues } = option;
//         // find value in option
//         const optionValue = optionValues.find(({ id }) => id === valueId);
//         if (optionValue) {
//             const optionValueIndex = option.optionValues.indexOf(optionValue);
//             // update value in option
//             return {
//                 system: {
//                     ...system,
//                     systemOptions: systemOptions
//                         .replace(optionIndex, {
//                             ...option,
//                             optionValues: option.optionValues
//                                 .replace(optionValueIndex, {
//                                     ...optionValue,
//                                     ...value,
//                                 }),
//                         }),
//                 },
//             };
//         } else {
//             // add value to option
//             return {
//                 system: {
//                     ...system,
//                     systemOptions: systemOptions
//                         .replace(optionIndex, {
//                             ...option,
//                             optionValues: option.optionValues
//                                 .concat({
//                                     id: valueId,
//                                     ...value,
//                                 }),
//                         }),
//                 },
//             };
//         }
//     } else {
//         // add option with updated value to state
//         return {
//             system: {
//                 ...system,
//                 systemOptions: systemOptions
//                     .concat({
//                         ...defaultSystemOption,
//                         id: optionId,
//                         optionValues: [{
//                             id: valueId,
//                             ...value,
//                         }],
//                     }),
//             },
//         };
//     }
// }