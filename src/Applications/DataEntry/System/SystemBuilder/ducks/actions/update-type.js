import * as schemas from "../schemas";
import { removeNullValues, replace } from "../../../../../../utils";

export default function UPDATE_TYPE(systemInput, {
    type,
    id,
    fakeId,
    __typename,
}) {

    const typesKey = `${__typename.replace(/System/i, 'system')}s`; // systemDetails
    const typeKey = `${__typename.replace(/System/i, '').toLowerCase()}Type`; // detailType
    const typesUpdateKey = `${__typename.replace(/System/i, 'system')}Update`; // SystemDetailUpdate

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
            replace(typesArray, updatedIndex, {
                ...updatedType,
                ...removeNullValues({
                    id,
                    fakeId,
                    [typeKey]: type,
                    __typename,
                }),
            })
            :
            typesArray.concat({
                ...typesUpdate,
                id,
                fakeId,
                [typeKey]: type,
                __typename,
            }),
    };
}