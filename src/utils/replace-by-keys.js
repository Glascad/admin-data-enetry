
/**
 * This function replaces keys such as `systemTypeBySystemTypeId` with `systemType`, removing the `By` part of the key;
 */

const replaceByKeys = obj => (
    !obj
    ||
    typeof obj !== "object"
) ?
    obj
    :
    Array.isArray(obj) ?
        obj.map(replaceByKeys)
        :
        Object.keys(obj)
            .reduce((filteredObj, key) => ({
                ...filteredObj,
                [key.replace(/By.*/, '')]: replaceByKeys(obj[key]),
            }), {});

export default replaceByKeys;