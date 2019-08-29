import { logInputOutput } from "..";

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
            [key]: extractArrayCount(value),
            ...(value && typeof value.totalCount === 'number' ?
                {
                    [`_${key.replace(/s?By.*$/, '')}Count`]: value.totalCount,
                }
                :
                null),
        }), {});

export default logInputOutput('extract array count', extractArrayCount);
