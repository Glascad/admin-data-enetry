
/**
 * Removes all `null` values from a graphql response, to allow default values.
 */

const removeNullValues = (obj, prev = [], { leave = [], ignore = [] } = {}) => (obj === null ?
    undefined
    :
    typeof obj !== 'object' || prev.includes(obj) ?
        obj
        :
        Array.isArray(obj) ?
            obj.map((item) => removeNullValues(item, [...prev, obj], { leave, ignore }))
            :
            Object.keys(obj)
                .reduce((filteredObj, key) => {
                    if (ignore.includes(key)) {
                        return {
                            ...filteredObj,
                            [key]: obj[key],
                        };
                    } else {
                        const value = removeNullValues(obj[key], [...prev, obj], { leave, ignore });
                        return value === undefined ?
                            leave.includes(key) ?
                                {
                                    ...filteredObj,
                                    [key]: Array.isArray(obj[key]) ?
                                        []
                                        :
                                        typeof key === 'object' ?
                                            {}
                                            :
                                            obj[key],
                                }
                                :
                                filteredObj
                            :
                            {
                                ...filteredObj,
                                [key]: value,
                            }
                    }
                }, {})
);

export default removeNullValues;