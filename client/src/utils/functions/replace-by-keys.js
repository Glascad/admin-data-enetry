
/**
 * This function replaces keys such as `systemTypeBySystemTypeId` with `_systemType`, removing the `By` part of the key and adding an `_` to the start.
 * 
 * It recursively searches through the object.
 * 
 * There is no circular structure protection yet.
 */

const matchBy = /(^.*)(By)(.+$)/;

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
                ...(key.match(matchBy) ?
                    {
                        [key.replace(matchBy, '_$1')]: {
                            ...replaceByKeys(obj[key]),
                            __by: key.replace(matchBy, '$3'),
                        },
                    } : {
                        [key]: replaceByKeys(obj[key]),
                    }
                ),
            }), {});

export default replaceByKeys;
