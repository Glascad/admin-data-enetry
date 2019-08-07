import { allocate, logInputOutput } from "../../../../../../../utils";

export default logInputOutput("Update System List", ({ system }, payload) => {
    // console.log(arguments);
    const [[key, { addedItems = [], deletedItems = [], comparisonKeys }], tooMany] = Object.entries(payload);
    if (tooMany) throw new Error('Cannot update multiple lists at once: ' + JSON.stringify(payload));
    // _validateKey(key);
    const deleteKey = key + 'ToDelete';
    const currentAddedItems = system[key];
    const currentDeletedItems = system[deleteKey];
    const {
        addedItems: newAddedItems,
        deletedItems: newDeletedItems,
    } = allocate({
        existing: {
            addedItems: currentAddedItems,
            deletedItems: currentDeletedItems,
        },
        incoming: {
            addedItems,
            deletedItems,
        },
        comparisonKeys,
    });
    // console.log({
    //     deleteKey,
    //     currentAddedItems,
    //     currentDeletedItems,
    //     newAddedItems,
    //     newDeletedItems,
    //     comparisonKeys,
    // });
    return {
        system: {
            ...system,
            [key]: newAddedItems,
            [deleteKey]: newDeletedItems,
        },
    };
});
