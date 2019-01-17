
/**
 * Removes all `null` values from a graphql response, to allow default values.
 */

const removeNullValues = (prev = []) => obj => (obj === null ?
    undefined
    :
    typeof obj !== 'object' || prev.includes(obj) ?
        obj
        :
        Array.isArray(obj) ?
            obj.map(removeNullValues([...prev, obj]))
            :
            Object.keys(obj)
                .reduce((filteredObj, key) => {
                    const value = removeNullValues([...prev, obj])(obj[key]);
                    return value === undefined ?
                        filteredObj
                        :
                        {
                            ...filteredObj,
                            [key]: value
                        }
                }, {})
);

export default removeNullValues;