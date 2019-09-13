export default function DELETE_TYPE(
    systemInput,
    payload,
) {
    const {
        id,
        fakeId,
        __typename,
    } = payload;

    const typesKey = `${__typename.replace(/System/i, 'system')}s`; //systemDetails
    const typesToDeleteKey = `${__typename.replace(/System/i, 'system')}IdsToDelete`; //systemDetailIdsToDelete

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