import UPDATE_OPTION from "./update-option";

export default function DELETE_OPTION_VALUE(systemInput, {
    parentOptionId,
    parentOptionFakeId,
    id,
    fakeId,
    __typename,
    newDefaultId,
    newDefaultFakeId,
}) {
    const optionValuesKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValues'); //systemOptionValues
    const optionsValueToDeleteKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValueIdsToDelete'); //systemOptionValueIdsToDelete
    const parentTypeName = __typename.replace(/OptionValue/i, 'Option');

    const { [optionValuesKey]: optionValuesArray } = systemInput;
    const { [optionsValueToDeleteKey]: optionValuesToDeleteArray } = systemInput;

    const newSystemInput = {
        ...arguments[0],
        [optionValuesKey]: optionValuesArray.filter(ov => !(
            (id && id === ov.id)
            ||
            (fakeId && fakeId === ov.fakeId)
        )),
        [optionsValueToDeleteKey]: id ? optionValuesToDeleteArray.concat(id) : optionValuesToDeleteArray
    };
    console.log({newDefaultId, newDefaultFakeId})
    return (newDefaultId || newDefaultFakeId) ?
        UPDATE_OPTION(newSystemInput, {
            id: parentOptionId,
            fakeId: parentOptionFakeId,
            __typename: parentTypeName,
            defaultOptionValueId: newDefaultId,
            defaultOptionValueFakeId: newDefaultFakeId,
        })
        :
        newSystemInput;
};