import * as schemas from "../schemas";
import { removeNullValues } from "../../../../../../utils";

export default function UPDATE_TYPE(systemInput, {
    type,
    id,
    fakeId,
    __typename,
    // ...payload
}) {

    // console.log({systemInput, payload});

    const typesKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'Types'); //systemDetailTypes
    const typeKey = __typename.replace(/System/i, '').toLowerCase().replace(/type/i, 'Type');
    const typesUpdateKey = __typename.replace(/System/i, 'system').replace(/Type/i, 'TypeUpdate'); //SystemDetailTypeUpdate

    const { [typesKey]: typesArray = [] } = systemInput;
    const { [typesUpdateKey]: typesUpdate, } = schemas

    const updatedType = typesArray.find(t => (
        id && id === t.id
    ) || (
            fakeId && fakeId === t.fakeId
        )
    );

    const updatedIndex = typesArray.indexOf(updatedType);

    console.log({
        typesKey,
        typesUpdateKey,
        typesArray,
        typesUpdate,
    });

    return {
        ...arguments[0],
        [typesKey]: updatedType ?
            typesArray.replace(updatedIndex, {
                ...updatedType,
                ...removeNullValues({
                    // ...payload,
                    id,
                    fakeId,
                    [typeKey]: type,
                    __typename,
                }),
            })
            :
            typesArray.concat({
                ...typesUpdate,
                // ...payload,
                id,
                fakeId,
                [typeKey]: type,
                __typename,
            }),
    };
}