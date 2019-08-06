import _ from 'lodash';

/**
 * allocateItems takes a single item and two arrays and returns a new set of two arrays, either filtering the item out of the second array, or else adding it to the first.
 * 
 * it also takes an optional callback which is used to decide whether the item should be added to the second or removed from the third.
 */

const allocateItems = (arr, positive = [], negative = [], compare) => {
    const [toRemove, toAdd] = _.partition(arr, a => negative.some(b => compare(a, b)));
    const left = positive.concat(toAdd);
    const right = negative.filter(a => !toRemove.some(b => compare(a, b)));
    console.log({
        arr,
        positive,
        negative,
        left,
        right,
    });
    return [left, right];
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
    comparisonKeys,
}) => {
    const compareItems = (a, b) => typeof a === 'object' ?
        Object.entries(a).every(([key, value]) => (
            comparisonKeys ?
                !comparisonKeys.includes(key) || (b[key] === value)
                :
                b[key] === value
        ))
        :
        a === b;
    const [newAddedItems, newDeletedItems] = allocateItems(
        addedItems,
        ...allocateItems(
            deletedItems,
            currentDeletedItems,
            currentAddedItems,
            compareItems,
        ).reverse(),
        compareItems,
    );
    return {
        addedItems: newAddedItems,
        deletedItems: newDeletedItems,
    };
}
