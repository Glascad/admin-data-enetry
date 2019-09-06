import { systemOptionUpdate } from "../schemas";

export default function UPDATE_OPTION(
    systemInput,
    payload,
) {

    const optionKey = payload.__typename.toLower().replace(/option/i, "Options");
    
    console.log(optionKey);

    const updatedOption = systemInput[optionKey].find(({ id, fakeId }) => (
        id && id === payload.id
    ) || (
            fakeId && fakeId === payload.fakeId
        )
    );

    const updatedIndex = systemInput[optionKey].indexOf(updatedOption);

console.log({payload, updatedOption, updatedIndex})

    return {
        ...arguments[0],
        [optionKey]: updatedOption ?
            systemInput[optionKey].replace(updatedIndex, {
                ...updatedOption,
                ...payload,
            })
            :
            systemInput[optionKey].concat({
                ...systemOptionUpdate,
                ...payload,
            }),
    };
}