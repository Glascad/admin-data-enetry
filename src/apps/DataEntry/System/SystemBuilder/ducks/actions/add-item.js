import UPDATE_ITEM from "./update-item";

// import UPDATE_ITEM from "./update-item";

export default function ADD_ITEM(systemMap, systemInput, {
    __typename,
    name,
    parentPath,
    optional,
    setAsDefault,
} = {}) {

    const itemsKey = `${__typename.replace(__typename[0], __typename[0].toLowerCase())}s`
    const { [itemsKey]: itemsArray = [] } = systemInput;

    const parent = systemMap[parentPath];
    const path = `${parentPath}.${name}`; 

    const newSystemInput = {
        ...systemInput,
        [itemsKey]: itemsArray.concat({
            __typename,
            path,
            optional,
        }),
    };

    return setAsDefault ?
        UPDATE_ITEM(newSystemInput, {
            ...parent,
            defaultValue: path,
        })
        :
        newSystemInput
}
