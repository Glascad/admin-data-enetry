import * as schemas from "../schemas";
import { getFakeId } from "../../../../../../application-logic/system-utils";
import UPDATE_OPTION from "./update-option";

export default function ADD_OPTION_VALUE(systemInput, {
    parentOptionId,
    parentOptionFakeId,
    name,
    __typename,
    setAsDefault,
}) {

    if (!__typename.match(/^(System|Detail|Configuration)OptionValue$/)) throw new Error(`Invalid type name: ${__typename}`);

    const valuesKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValues');
    const valueUpdateKey = __typename.toLowerCase().replace(/OptionValue/i, 'OptionValueUpdate');
    const parentOptionKey = `parent${__typename.replace(/Value/i, '')}${parentOptionFakeId ? 'Fake' : ''}Id` // `parentSystemOptionValueId`
    const parentTypename = __typename.replace(/OptionValue/i, 'Option');

    const { [valuesKey]: valuesArray } = systemInput;
    const { [valueUpdateKey]: valueUpdate, } = schemas;

    const fakeId = getFakeId();

    const newSystemInput = {
        ...systemInput,
        [valuesKey]: valuesArray.concat({
            ...valueUpdate,
            fakeId,
            name,
            [parentOptionKey]: parentOptionFakeId || parentOptionId,
        }),
    };

    return setAsDefault ?
        UPDATE_OPTION(newSystemInput, {
            id: parentOptionId,
            fakeId: parentOptionFakeId,
            __typename: parentTypename,
            defaultOptionValueFakeId: fakeId,
        })
        :
        newSystemInput
}
