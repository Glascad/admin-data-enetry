export default function DELETE_OPTION(
    systemInput,
    payload,
) {
    const {
        id,
        fakeId,
        __typename,
    } = payload;

    const optionsKey = __typename.toLowerCase().replace(/Option/i, 'Options'); //systemOptions
    const optionsToDeleteKey = __typename.toLowerCase().replace(/Option/i, 'OptionIdsToDelete'); //systemOptionIdsToDelete

    const { [optionsKey]: optionsArray } = systemInput;
    const { [optionsToDeleteKey]: optionsToDeleteArray } = systemInput;

    return {
        ...arguments[0],
        [optionsKey]: optionsArray.filter(o => !(
            (id && id === o.id)
            ||
            (fakeId && fakeId === o.fakeId)
        )),
        [optionsToDeleteKey]: id ? optionsToDeleteArray.concat(id) : optionsToDeleteArray
    };
}