
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
    Object.keys(obj)
        .reduce((reducedObj, key) => {
            const value = obj[key];
            if (
                value
                &&
                typeof value === "object"
                &&
                Array.isArray(value.nodes)
            ) {
                return {
                    ...reducedObj,
                    [key]: value.nodes.map(flattenNodeArrays),
                }
            } else return {
                ...reducedObj,
                [key]: flattenNodeArrays(value),
            }
        }, {});

export default flattenNodeArrays;
