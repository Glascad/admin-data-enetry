import { systemOptionUpdate, systemOptionValueUpdate } from "../schemas";

export default function ADD_OPTION_VALUE({
    systemOptions,
}, {
    optionId,
    optionFakeId,
}) {

    const updatedOption = systemOptions.find(({ id, fakeId }) => (
        id && id === optionId
    ) || (
            fakeId && fakeId === optionFakeId
        )
    );
    const updatedIndex = systemOptions.indexOf(updatedOption);

    return {
        ...arguments[0],
        systemOptions: updatedOption ?
            systemOptions.replace(updatedIndex, {
                ...updatedOption,

            })
            :
            systemOptions.concat({
                ...systemOptionUpdate,
                id: optionId,
                fakeId: optionFakeId,
                systemOptionValues: ((updatedOption || {}).systemOptionValues || []).concat(systemOptionValueUpdate)
            }),
    };
}
