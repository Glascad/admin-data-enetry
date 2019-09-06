import * as schemas from "../schemas";
import { getFakeId } from "../utils";

export default function ADD_OPTION_VALUE(systemInput, {
    optionId,
    optionFakeId,
    name,
    __typename,
}) {

    const optionsKey = __typename.toLowerCase().replace(/OptionValue/i, 'Options');
    const optionUpdateKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionUpdate');
    const valuesKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValues');
    const valueUpdateKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValueUpdate');

    const { [optionsKey]: optionsArray } = systemInput;
    const {
        [optionUpdateKey]: optionUpdate,
        [valueUpdateKey]: valueUpdate,
    } = schemas;

    const updatedOption = optionsArray.find(({ id, fakeId }) => (
        id && id === optionId
    ) || (
            fakeId && fakeId === optionFakeId
        )
    );
    const updatedIndex = optionsArray.indexOf(updatedOption);

    return {
        ...systemInput,
        [optionsKey]: updatedOption ?
            optionsArray.replace(updatedIndex, {
                ...updatedOption,
                [valuesKey]: (updatedOption[valuesKey] || []).concat({
                    ...valueUpdate,
                    fakeId: getFakeId(),
                    name,
                })
            })
            :
            optionsArray.concat({
                ...optionUpdate,
                id: optionId,
                fakeId: optionFakeId,
                [valuesKey]: [{
                    ...valueUpdate,
                    fakeId: getFakeId(),
                    name,
                }],
            }),
    };
}
