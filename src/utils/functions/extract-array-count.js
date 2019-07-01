/**
 * This function removes the array count (`totalCount`) from the result object, similar to the `nodes` array in `flatten-node-arrays.js`
 */

const extractArrayCount = obj => (
    !obj
    ||
    typeof obj !== 'object'
) ?
    obj
    :
    Object.entries(obj)
        .reduce((reducedObj, [key, value]) => ({
            ...reducedObj,
            [key]: value,
            ...(value && typeof value.totalCount === 'number' ?
                {
                    [`${key}Count`]: value.totalCount,
                }
                :
                null),
        }), {});

export default extractArrayCount;
