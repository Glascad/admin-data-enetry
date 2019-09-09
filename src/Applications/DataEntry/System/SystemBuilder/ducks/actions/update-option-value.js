import * as schemas from "../schemas";
import { removeNullValues } from "../../../../../../utils";

export default function UPDATE_OPTION_VALUE(
    systemInput,
    payload,
) {

    // console.log({systemInput, payload});

    const optionValuesKey = payload.__typename.toLowerCase().replace(/OptionValue/i, 'OptionValues');
    const optionValueUpdateKey = payload.__typename.toLowerCase().replace(/OptionValue/i, 'OptionValueUpdate');

    const { [optionValuesKey]: optionValuesArray = [] } = systemInput;
    const { [optionValueUpdateKey]: optionValueUpdate, } = schemas

    const updatedOptionValue = optionValuesArray.find(({ id, fakeId }) => (
        id && id === payload.id
    ) || (
            fakeId && fakeId === payload.fakeId
        )
    );

    const updatedIndex = optionValuesArray.indexOf(updatedOptionValue);

    return {
        ...arguments[0],
        [optionValuesKey]: updatedOptionValue ?
            optionValuesArray.replace(updatedIndex, {
                ...updatedOptionValue,
                ...removeNullValues(payload),
            })
            :
            optionValuesArray.concat({
                ...optionValueUpdate,
                ...payload,
            }),
    };
}