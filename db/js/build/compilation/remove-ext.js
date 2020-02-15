
export const removeExt = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key.replace(/\.sql/, '')]: removeExt(value),
    }), {})
    :
    obj;

module.exports = removeExt;
