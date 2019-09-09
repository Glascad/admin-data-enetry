import * as schemas from "../schemas";
import { removeNullValues } from "../../../../../../utils";

export default function UPDATE_TYPE(
    systemInput,
    payload,
) {

    // console.log({systemInput, payload});

    const typesKey = payload.__typename.replace(/System/i, 'system').replace(/Type/i, 'Types'); //systemDetailTypes
    const typesUpdateKey = payload.__typename.replace(/System/i, 'system').replace(/Type/i, 'TypeUpdate'); //SystemDetailTypeUpdate

    const { [typesKey]: typesArray = [] } = systemInput;
    const { [typesUpdateKey]: typesUpdate, } = schemas

    const updatedType = typesArray.find(({ id, fakeId }) => (
        id && id === payload.id
    ) || (
            fakeId && fakeId === payload.fakeId
        )
    );

    const updatedIndex = typesArray.indexOf(updatedType);

    return {
        ...arguments[0],
        [typesKey]: updatedType ?
            typesArray.replace(updatedIndex, {
                ...updatedType,
                ...removeNullValues(payload),
            })
            :
            typesArray.concat({
                ...typesUpdate,
                ...payload,
            }),
    };
}