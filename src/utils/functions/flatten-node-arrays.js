
/**
 * This function flattens all query result keys, removing the `nodes` key
 * 
 * For Example:
 * 
{
    data: {
        allSystems: {
            nodes: [
                { id: 1 },
                { id: 2 }
            ]
        }
    }
}
    will be turned to
{
    data: {
        allSystems: [
            { id: 1 },
            { id: 2 }
        ]
    }
};
 * It recursively moves through the object, with currently no circular structure protection.
 * This protection may be inserted at a later date.
*/

const flattenNodeArrays = obj => (
    !obj
    ||
    typeof obj !== "object"
) ?
    obj
    :
    Object.entries(obj)
        .reduce((reducedObj, [key, value]) => ({
            ...reducedObj,
            [key]: (
                value
                &&
                typeof value === "object"
            ) ?
                Array.isArray(value.nodes) ?
                    value.nodes.map(flattenNodeArrays)
                    :
                    Array.isArray(value.enumValues) ?
                        value.enumValues.map(({ name }) => name)
                        :
                        Array.isArray(value) ?
                            value.map(flattenNodeArrays)
                            :
                            flattenNodeArrays(value)
                :
                value,
        }), {});

export default flattenNodeArrays;
