import * as schemas from "../schemas";
import { getFakeId } from "../utils";

export default function ADD_OPTION_VALUE(systemInput, {
    parentOptionId,
    parentOptionFakeId,
    name,
    __typename,
}) {

    const valuesKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValues');
    const valueUpdateKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValueUpdate');
    const parentOptionKey = `parent${__typename.replace(/Value/i, '')}${parentOptionFakeId ? 'Fake' : ''}Id` // `parentSystemOptionValueId`

    const { [valuesKey]: valuesArray } = systemInput;
    const { [valueUpdateKey]: valueUpdate, } = schemas;

    return {
        ...systemInput,
        [valuesKey]: valuesArray.concat({
            ...valueUpdate,
            fakeId: getFakeId(),
            name,
            [parentOptionKey]: parentOptionFakeId || parentOptionId,
        }),
    };
}
