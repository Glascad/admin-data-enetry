
// (function () {

//     function update(arr) {
//         return arr.reduce(([updated, deleted], item) => {
//             if (shouldDelete(item)) return [updated, deleted.concat(item)];
//             else return [updated.concat(item), deleted];
//         }, [[], []]);
//     }

//     const [sos, sosToDelete] = update(sos);
//     const [sovs, sovsToDelete] = update(sovs);
//     const [sds, sdsToDelete] = update(sds);
//     const [dos, dosToDelete] = update(dos);
//     const [dovs, dovsToDelete] = update(dovs);
//     const [scs, scsToDelete] = update(scs);
//     const [cos, cosToDelete] = update(cos);
//     const [covs, covsToDelete] = update(covs);

//     return {
//         deletions: [
//             ...sosToDelete,
//             ...sovsToDelete,
//             ...sdsToDelete,
//             ...dosToDelete,
//             ...dovsToDelete,
//             ...scsToDelete,
//             ...cosToDelete,
//             ...covsToDelete,
//         ],
//         sos,
//         sovs,
//         sds,
//         dos,
//         dovs,
//         scs,
//         cos,
//         covs,
//     };
// });



// MOVING AN ITEM
// not selectable becomes disabled
// cahnge the onclick to do whatever needs to be done

// Options = type, values -> end node and not already in path.
//     Values = Option -> options with the same name, not already included.
//     Types - > Values
//         Detail -> terminal system Option value -> details or none and not current detail
//         Configuration -> same thing, but detail Values.

// Voids will make a difference