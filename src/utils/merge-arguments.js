
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
const matchNew = /(^new)(.+$)/;

const divide = (arr, cb) => arr.reduce(([T, F], item) => cb(item, T, F) ?
    [T.concat(item), F]
    :
    [T, F.concat(item)],
    [[], []]);

const allocate = (arr, T = [], F = [], compare = (item, T, F) => F.includes(item)) => {
    const [toRemove, toAdd] = divide(arr, compare);
    return [
        T.concat(toAdd),
        F.filter(item => !toRemove.includes(item)),
    ];
}

const mergeArguments = (prevArgs, incomingArgs, compare) => ({
    ...prevArgs,
    ...Object.keys(incomingArgs)
        .reduce((merged, key) => {

            if (merged.__merged__ && merged.__merged__.includes(key)) return merged;

            const incomingValue = incomingArgs[key];

            if (!Array.isArray(incomingValue)) {
                return {
                    ...merged,
                    [key]: incomingValue,
                };
            } else {

                const prevValue = prevArgs[key];

                if (prevValue !== undefined && !Array.isArray(prevValue)) {
                    console.error({ prevValue, incomingValue });
                    throw new Error(`Received differing data types previous value: ${prevValue}, incoming value: ${incomingValue.join(", ")}`);
                }

                const opposite = key.match(matchNew) ?
                    key.replace(matchNew, 'old$2')
                    :
                    key.replace(matchOld, 'new$2');

                const prevOpposite = prevArgs[opposite];

                if (!Array.isArray(prevOpposite)) {
                    return {
                        ...merged,
                        [key]: (prevValue || []).concat(incomingValue),
                    };
                } else {

                    const incomingOpposite = incomingArgs[opposite];

                    // const [outgoingValue, outgoingOpposite] = allocate(incomingValue, prevValue, prevOpposite);

                    // const [newOutgoingOpposite, newOutgoingValue] = allocate(incomingOpposite, outgoingOpposite, outgoingValue);

                    const [outgoingOpposite, outgoingValue] = allocate(
                        incomingOpposite || [],
                        ...allocate(
                            incomingValue || [],
                            prevValue || [],
                            prevOpposite || [],
                            compare,
                        ).reverse(),
                        compare,
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
