import { systemOptionUpdate } from "../../schemas";

export default function UPDATE_SYSTEM_OPTION({
    // queryStatus not needed ?
    //     // queryStatus
    // }, {
    // systemInput
    systemOptions,
},
    optionUpdate
) {
    const updatedOption = systemOptions.find(({ id, fakeId }) => (
        id && id === optionUpdate.id
    ) || (
            fakeId && fakeId === optionUpdate.fakeId
        )
    );
    const updatedIndex = systemOptions.indexOf(updatedOption);
    return {
        ...arguments[0],
        systemOptions: updatedOption ?
            systemOptions.replace(updatedIndex, {
                ...updatedOption,
                ...optionUpdate,
            })
            :
            systemOptions.concat({
                ...systemOptionUpdate,
                ...optionUpdate,
            }),
    };
}