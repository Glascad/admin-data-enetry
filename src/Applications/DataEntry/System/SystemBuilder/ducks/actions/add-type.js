import * as schemas from "../schemas";
import { getFakeId } from "../../../../../../application-logic/system-utils";

export default function ADD_TYPE(systemInput, {
    parentOptionValueId,
    parentOptionValueFakeId,
    type,
    __typename,
}) {

    const typesKey = `${__typename.replace(/System/i, 'system')}s`; // systemDetails
    const typeKey = `${__typename.replace(/System/i, '').toLowerCase()}Type`; // detailType
    const typeUpdateKey = `${__typename.replace(/System/i, 'system')}Update`; // SystemDetailUpdate
    const parentOptionValueKey = `parent${
        __typename
            .replace(/SystemConfiguration/i, 'DetailOptionValue')
            .replace(/SystemDetail/i, 'SystemOptionValue')
        }${
        parentOptionValueFakeId ? 'Fake' : ''
        }Id` // `parentSystemOptionValueId`

    const { [typesKey]: typeArray = [] } = systemInput;
    const { [typeUpdateKey]: typeUpdate, } = schemas;

    // console.log({
    //     typesKey,
    //     parentOptionValueId,
    //     parentOptionValueFakeId,
    //     type,
    //     typeKey,
    // });

    return {
        ...systemInput,
        [typesKey]: typeArray.concat({
            ...typeUpdate,
            fakeId: getFakeId(),
            [typeKey]: type,
            [parentOptionValueKey]: parentOptionValueFakeId || parentOptionValueId,
        }),
    };
};
