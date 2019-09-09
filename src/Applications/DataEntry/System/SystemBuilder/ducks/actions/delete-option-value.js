export default function DELETE_OPTION_VALUE(
    systemInput,
    payload,
) {
    const {
        id,
        fakeId,
        __typename,
    } = payload;

    const optionValuesKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValues'); //systemOptionValues
    const optionsValueToDeleteKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValueIdsToDelete'); //systemOptionValueIdsToDelete

    const { [optionValuesKey]: optionValuesArray } = systemInput;
    const { [optionsValueToDeleteKey]: optionValuesToDeleteArray } = systemInput;

    return {
        ...arguments[0],
        [optionValuesKey]: optionValuesArray.filter(ov => !(
            (id && id === ov.id)
            ||
            (fakeId && fakeId === ov.fakeId)
        )),
        [optionsValueToDeleteKey]: id ? optionValuesToDeleteArray.concat(id) : optionValuesToDeleteArray
    };
};