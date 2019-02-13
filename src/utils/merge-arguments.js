
/**
 * NOTE: This functionality relies on the convention of prefixing intermediate table values to be created with `new`, and those to be deleted with `old`. Similarly to how the ApolloBatcher relies on the convention followed by Postgraphile of prefixing create mutations with `create` etc..., and compares the `delete` mutations against `create` mutations.
 * 
 * mergeArguments is used by the ApolloBatcher to merge argumentsets when a mutation is batched multiple times for the same item.
 * 
 * For non-array keys, the incoming value overrides the existing value, if any.
 * 
 * For array keys, it uses the allocate function to compare incoming values against old values, removing `new` items from the `old` items array and removing `old` items from the `new` array before adding them to the respective array.
 * 
 * The allocate function takes in three arrays. The first array contains values that should either be removed from the third array or added to the second array (but not both). It then returns the updated second and third arrays.
 * 
 * Example:
 * 
 * with the existing argument set in state:
 * 
 * existingMutationArgumentSet = {
 *     nodeId: 1,
 *     systemId: 1,
 *     newSystemTags: [1, 2],
 *     oldSystemTags: [4],
 * }
 * 
 * after receiving this incoming mutation:
 * 
 * incomingMutationArgumentSet = {
 *     nodeId: 1,
 *     systemId: 1,
 *     newSystemTags: [3, 4],
 *     oldSystemTags: [1, 5],
 * }
 * 
 * the resulting argument set will look as follows:
 * 
 * outgoingMutationArgumentSet = {
 *     nodeId: 1,
 *     systemId: 1,
 *     newSystemTags: [2, 3],
 *     oldSystemTags: [5],
 * }
 * 
 * the `new` 4 was filtered out of the `old` system tags, while the 3 was added,
 * and the `old` 1 was filtered out of the `new`, and the 5 was added.
 */

const matchOld = /(^old)(.+$)/;
const replaceOld = 'new$2';
const matchNew = /(^new)(.+$)/;
const replaceNew = 'old$2';


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


/**
 * mergeArguments...
 */

const mergeArguments = ({
    previous,
    incoming,
    getOppositeKey = key => key.match(matchNew) ?
        key.replace(matchNew, replaceNew)
        :
        key.replace(matchOld, replaceOld),
    removeItem,
}) => ({
    ...previous,
    ...Object.keys(incoming)
        .reduce((merged, key) => {

            if (merged.__merged__ && merged.__merged__.includes(key)) return merged;

            const incomingValue = incoming[key];

            if (!Array.isArray(incomingValue)) {
                return {
                    ...merged,
                    [key]: incomingValue,
                };
            } else {

                const prevValue = previous[key];

                if (prevValue !== undefined && !Array.isArray(prevValue)) {
                    console.error({ prevValue, incomingValue });
                    throw new Error(`Received differing data types previous value: ${prevValue}, incoming value: ${incomingValue.join(", ")}`);
                }

                const opposite = getOppositeKey(key);

                const prevOpposite = previous[opposite];

                if (!Array.isArray(prevOpposite)) {
                    return {
                        ...merged,
                        [key]: (prevValue || []).concat(incomingValue),
                    };
                } else {

                    const incomingOpposite = incoming[opposite];

                    const [outgoingOpposite, outgoingValue] = allocateItems(
                        incomingOpposite || [],
                        ...allocateItems(
                            incomingValue || [],
                            prevValue || [],
                            prevOpposite || [],
                            removeItem,
                        ).reverse(),
                        removeItem,
                    );

                    return {
                        ...merged,
                        __merged__: (merged.__merged__ || []).concat(key, opposite),
                        [opposite]: outgoingOpposite,
                        [key]: outgoingValue,
                    };
                }
            }
        }, {}),
});

export default mergeArguments;
