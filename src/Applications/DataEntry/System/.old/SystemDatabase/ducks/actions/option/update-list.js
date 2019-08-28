// import { allocate } from "../../../../../../../../utils";
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
//     // console.trace(arguments);
//     const [[key, { addedItems, deletedItems }], tooMany] = Object.entries(update);
//     if (tooMany) throw new Error('Cannot update multiple lists at once: ' + JSON.stringify(update));
//     // _validateKey(key);
//     const deleteKey = key + 'ToDelete';
//     // find option in state
//     const option = systemOptions
//         .find(({ id }) => id === optionId);
//     if (option) {
//         const optionIndex = systemOptions
//             .indexOf(option);
//         const currentAddedItems = option[key];
//         const currentDeletedItems = option[deleteKey];
//         const {
//             addedItems: newAddedItems,
//             deletedItems: newDeletedItems,
//         } = allocate({
//             existing: {
//                 addedItems: currentAddedItems,
//                 deletedItems: currentDeletedItems,
//             },
//             incoming: {
//                 addedItems,
//                 deletedItems,
//             },
//         });
//         // console.log({
//         //     key,
//         //     deleteKey,
//         //     addedItems,
//         //     deletedItems,
//         //     currentAddedItems,
//         //     currentDeletedItems,
//         //     newAddedItems,
//         //     newDeletedItems,
//         // });
//         return {
//             system: {
//                 ...system,
//                 systemOptions: systemOptions
//                     .replace(optionIndex, {
//                         ...option,
//                         [key]: newAddedItems,
//                         [deleteKey]: newDeletedItems,
//                     }),
//             },
//         };
//     } else {
//         return {
//             system: {
//                 ...system,
//                 systemOptions: systemOptions
//                     .concat({
//                         ...defaultSystemOption,
//                         id: optionId,
//                         [key]: addedItems,
//                         [deleteKey]: deletedItems,
//                     }),
//             },
//         };
//     }
// }