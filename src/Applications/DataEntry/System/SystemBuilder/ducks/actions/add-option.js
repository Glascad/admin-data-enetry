import * as schemas from '../schemas';
import { getFakeId } from "../../../../../../application-logic/system-utils";

export default function ADD_OPTION(systemInput, {
    // payload
    __typename, // SystemOption | DetailOption | ConfigurationOption
    name,
    parentOptionValueId,
    parentOptionValueFakeId,
    parentTypeId,
    parentTypeFakeId,
}) {

    const optionsKey = __typename.toLowerCase().replace(/Option/i, 'Options'); // `systemOptions`
    const updateKey = __typename.toLowerCase().replace(/Option/i, 'OptionUpdate');
    const parentOptionValueKey = `parent${__typename}Value${parentOptionValueFakeId ? 'Fake' : ''}Id` // `parentSystemOptionValueId`
    const parentTypeKey = `parentSystem${__typename.replace(/Option/i, '')}${parentTypeFakeId ? 'Fake' : ''}Id`; // `systemDetailFakeId`

    const { [optionsKey]: optionsArray } = systemInput;
    const { [updateKey]: optionUpdate } = schemas;

    // return new state (system input)
    return {
        ...systemInput,
        [optionsKey]: optionsArray.concat({
            ...optionUpdate,
            fakeId: getFakeId(),
            name,
            [parentOptionValueKey]: parentOptionValueFakeId || parentOptionValueId,
            [parentTypeKey]: parentTypeFakeId || parentTypeId,
        }),
    };
}
