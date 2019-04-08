
/**
 * divideArray takes an array and a callback and returns an array of two arrays, the first containing all items from the original array with which the callback returned true, and the second array contains all other items from the original array.
 * 
 * the callback should return a boolean value.
 */

export const divideArray = (arr, allocateLeft) => arr.reduce(([L, R], item) => allocateLeft(item, L, R) ?
    [L.concat(item), R]
    :
    [L, R.concat(item)],
    [[], []]);


/**
 * allocateItems takes a single item and two arrays and returns a new set of two arrays, either filtering the item out of the second array, or else adding it to the first.
 * 
 * it also takes an optional callback which is used to decide whether the item should be added to the second or removed from the third.
 */

export const allocateItems = (arr, L = [], R = [], allocateLeft) => {
    const [toRemove, toAdd] = divideArray(arr, allocateLeft || (item => R.includes(item)));
    return [
        L.concat(toAdd),
        R.filter(item => !toRemove.includes(item)),
    ];
}

export default ({
    incoming: {
        addedItems,
        deletedItems,
    },
    existing: {
        addedItems: currentAddedItems,
        deletedItems: currentDeletedItems,
    },
}) => {
    const [newAddedItems, newDeletedItems] = allocateItems(
        addedItems,
        ...allocateItems(
            deletedItems,
            currentDeletedItems,
            currentAddedItems,
        ).reverse(),
    );
    return {
        addedItems: newAddedItems,
        deletedItems: newDeletedItems,
    };
}
