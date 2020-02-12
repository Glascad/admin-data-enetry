
/**
 * Removes all `null` values from a graphql response, to allow default values.
 * 
 * Recursively searches through the object, protecting against circular structures using the `prev` array.
 */

const removeNullishValues = (obj, prev = []) => (obj === null ?
    undefined
    :
    typeof obj !== 'object' || prev.includes(obj) ?
        obj
        :
        Array.isArray(obj) ?
            obj.map((item) => removeNullishValues(item, [...prev, obj]))
            :
            Object.keys(obj)
                .reduce((filteredObj, key) => {
                    const value = removeNullishValues(obj[key], [...prev, obj]);
                    return value === undefined ?
                        filteredObj
                        :
                        {
                            ...filteredObj,
                            [key]: value,
                        };
                }, {})
);

export default (obj = {}) => removeNullishValues(obj);
