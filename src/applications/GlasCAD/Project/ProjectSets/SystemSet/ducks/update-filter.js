

// function ({
//     filters,
//     filters: {
//         manufacturerId: oldManufacturerId,
//         systemTypeId: oldSystemTypeId,
//     },
//     systemSetInput,
//     systemSetInput: {
//         systemId: oldSystemId,
//     },
// }, {
//     manufacturerId: newManufacturerId,
//     systemTypeId: newSystemTypeId,
// }, {
//     allManufacturers,
// }) {

//     console.log(arguments);



//     const manufacturerChanged = newManufacturerId && newManufacturerId !== oldManufacturerId;
//     const systemTypeChanged = newSystemTypeId && newSystemTypeId !== oldSystemTypeId;

//     if (!(manufacturerChanged || systemTypeChanged)) return arguments[0];
//     else {
//         const manufacturerId = newManufacturerId || oldManufacturerId;
//         const systemTypeId = newSystemTypeId || oldSystemTypeId;

//         const manufacturer = manufacturerChanged && allManufacturers.find(({ id }) => id === manufacturerId);

//         const systems = (manufacturer || {})._systems || []

//         const systemId = manufacturerChanged ?
//             (
//                 systems.find(({ id }) => id === oldSystemId)
//                 ||
//                 systems[0] || {}
//             ).id
//             :
//             oldSystemId;

//         return {
//             filters: {
//                 ...filters,
//                 manufacturerId,
//                 systemTypeId,
//             },
//             systemSetInput: {
//                 ...systemSetInput,
//                 systemId,
//             },
//         };
//     }
// }
