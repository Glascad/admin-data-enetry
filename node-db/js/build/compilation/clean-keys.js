
const cleanKeys = obj => typeof obj === 'object' ?
    Object.entries(obj).reduce((all, [key, value]) => ({
        ...all,
        [key.replace(/-/, '_').toUpperCase()]: cleanKeys(value)
    }), {})
    :
    obj;

module.exports = cleanKeys;
