import * as schemas from "../schemas";
import { getFakeId } from "../utils";

export default function ADD_TYPE(systemInput, {
    parentOptionValueId,
    parentOptionValueFakeId,
    name,
    __typename,
}) {

    const typeKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'Types'); //systemDetailTypes
    const typeUpdateKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'TypeUpdate'); //SystemDetailTypeUpdate
    const parentOptionValueKey = `parent${__typename
        .replace(/SystemConfigurationType/i, 'DetailOptionValue')
        .replace(/SystemDetailType/i, 'SystemOptionValue')
        }${parentOptionValueFakeId ? 'Fake' : ''}Id` // `parentSystemOptionValueId`

    const { [typeKey]: typeArray = [] } = systemInput;
    const { [typeUpdateKey]: typeUpdate, } = schemas;

    return {
        ...systemInput,
        [typeKey]: typeArray.concat({
            ...typeUpdate,
            fakeId: getFakeId(),
            name,
            [parentOptionValueKey]: parentOptionValueFakeId || parentOptionValueId,
        }),
    };
};
