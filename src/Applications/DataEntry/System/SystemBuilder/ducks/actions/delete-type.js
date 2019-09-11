export default function DELETE_TYPE(
    systemInput,
    payload,
) {
    const {
        id,
        fakeId,
        __typename,
    } = payload;

    const typesKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'Types'); //systemDetailTypes
    const typesToDeleteKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'TypeIdsToDelete'); //systemDetailTypeIdsToDelete

    const { [typesKey]: typesArray } = systemInput;
    const { [typesToDeleteKey]: typesToDeleteArray } = systemInput;

    return {
        ...arguments[0],
        [typesKey]: typesArray.filter(o => !(
            (id && id === o.id)
            ||
            (fakeId && fakeId === o.fakeId)
        )),
        [typesToDeleteKey]: id ? typesToDeleteArray.concat(id) : typesToDeleteArray
    };
}