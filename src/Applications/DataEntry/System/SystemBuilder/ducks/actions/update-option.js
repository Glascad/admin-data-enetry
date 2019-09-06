import * as schemas from "../schemas";
import { removeNullValues } from "../../../../../../utils";

export default function UPDATE_OPTION(
    systemInput,
    payload,
) {

    console.log({systemInput, payload});

    const optionsKey = payload.__typename.toLowerCase().replace(/Option/i, 'Options');
    const optionUpdateKey = payload.__typename.toLowerCase().replace(/Option/i, 'OptionUpdate');

    const { [optionsKey]: optionsArray } = systemInput;
    const {
        [optionUpdateKey]: optionUpdate,
    } = schemas

    console.log(optionsArray);

    optionsArray.forEach(({ id, fakeId }) => {
       console.log("OPTIONS");
       console.log({id, fakeId}, payload.id, payload.fakeId); 
    });


    const updatedOption = optionsArray.find(({ id, fakeId }) => (
        id && id === payload.id
    ) || (
            fakeId && fakeId === payload.fakeId
        )
    );

    const updatedIndex = optionsArray.indexOf(updatedOption);

    console.log({ payload, updatedOption, updatedIndex, optionsKey, optionUpdateKey })

    const thisIsUpdated = optionsArray.replace(updatedIndex, {
        ...updatedOption,
        ...removeNullValues(payload),
    })

    console.log(thisIsUpdated);

    return {
        ...arguments[0],
        [optionsKey]: updatedOption ?
            optionsArray.replace(updatedIndex, {
                ...updatedOption,
                ...removeNullValues(payload),
            })
            :
            optionsArray.concat({
                ...optionUpdate,
                ...payload,
            }),
    };
}