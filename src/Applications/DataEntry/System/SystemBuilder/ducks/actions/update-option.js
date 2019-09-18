import * as schemas from "../schemas";
import { removeNullValues, replace } from "../../../../../../utils";

export default function UPDATE_OPTION(
    systemInput,
    {
        __typename,
        id,
        fakeId,
        name,
        parentValueId,
        parentValueFakeId,
        parentTypeId,
        parentTypeFakeId,
        defaultOptionValueId,
        defaultOptionValueFakeId,
    },
) {
    console.log(arguments[1]);

    const optionsKey = __typename.toLowerCase().replace(/Option/i, 'Options');
    const optionUpdateKey = __typename.toLowerCase().replace(/Option/i, 'OptionUpdate');
    const defaultOptionValueIdKey = (defaultOptionValueId || defaultOptionValueFakeId) ?
        `default${__typename}Value${defaultOptionValueFakeId ? 'Fake' : ''}Id`
        :
        undefined;

    const defaultOptionValueIdKeyToRemove = defaultOptionValueIdKey ?
        `default${__typename}Value${defaultOptionValueFakeId ? '' : 'Fake'}Id`
        :
        undefined;

    const { [optionsKey]: optionsArray } = systemInput;
    const { [optionUpdateKey]: optionUpdate, } = schemas;

    const parentIdKey = (parentValueId || parentValueFakeId) ?
        `parent${__typename}Value${parentValueFakeId ? 'Fake' : ''}Id`
        :
        (parentTypeId || parentTypeFakeId) ?
            `parentSystem${__typename.replace(/Option/i, '')}${parentTypeFakeId ? 'Fake' : ''}Id`
            :
            undefined;

    const parentIdKeyToRemove = (parentValueId || parentValueFakeId) ?
        `parent${__typename}Value${parentValueFakeId ? '' : 'Fake'}Id`
        :
        (parentTypeId || parentTypeFakeId) ?
            `parentSystem${__typename.replace(/Option/i, '')}${parentTypeFakeId ? '' : 'Fake'}Id`
            :
            undefined;

    const updatedOption = optionsArray.find(o => (
        o.id && o.id === id
    ) || (
            o.fakeId && o.fakeId === fakeId
        )
    );

    const updatedIndex = optionsArray.indexOf(updatedOption);

    console.log({
        __typename,
        id,
        fakeId,
        name,
        parentValueId,
        parentValueFakeId,
        parentTypeId,
        parentTypeFakeId,
        defaultOptionValueId,
        defaultOptionValueFakeId,
        optionsKey,
        optionUpdateKey,
        defaultOptionValueIdKey,
        defaultOptionValueIdKeyToRemove,
        optionsArray,
        optionUpdate,
        parentIdKey,
        parentIdKeyToRemove,
        updatedOption,
        updatedIndex,
    })

    const log = arg => console.log(arg) || arg;

    return log({
        ...arguments[0],
        [optionsKey]: updatedOption ?
            replace(optionsArray, updatedIndex, {
                ...updatedOption,
                ...removeNullValues({
                    __typename,
                    id,
                    fakeId,
                    name,
                }),
                [parentIdKey]: parentValueId || parentValueFakeId || parentTypeId || parentTypeFakeId,
                [defaultOptionValueIdKey]: defaultOptionValueId || defaultOptionValueFakeId,
                [parentIdKeyToRemove]: undefined,
                [defaultOptionValueIdKeyToRemove]: undefined,

            })
            :
            optionsArray.concat({
                ...optionUpdate,
                ...removeNullValues({
                    __typename,
                    id,
                    fakeId,
                    name,
                }),
                [parentIdKey]: parentValueId || parentValueFakeId || parentTypeId || parentTypeFakeId,
                [defaultOptionValueIdKey]: defaultOptionValueId || defaultOptionValueFakeId,
                [parentIdKeyToRemove]: undefined,
                [defaultOptionValueIdKeyToRemove]: undefined,
            }),
    });
}