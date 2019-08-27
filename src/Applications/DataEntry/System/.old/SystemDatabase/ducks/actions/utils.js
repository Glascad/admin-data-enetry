
// fake ids are always stringified numbers
export const _getFakeId = (() => {
    var _fakeId = 1;
    return () => `${_fakeId++}`;
})();

export const _removeFakeIds = obj => !obj || typeof obj !== 'object' ?
    obj
    :
    Object.entries(obj).reduce((result, [key, value]) => ({
        ...result,
        [key]: key === 'id' || key === '__created' ?
            typeof value === 'number' ?
                value
                :
                undefined
            :
            value && typeof value === 'object' ?
                Array.isArray(value) ?
                    value.map(_removeFakeIds)
                    :
                    _removeFakeIds(value)
                :
                value,
    }), {});
