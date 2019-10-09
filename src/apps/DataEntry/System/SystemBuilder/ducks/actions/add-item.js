export default function ADD_ITEM(systemInput, payload) {
    const { __typename } = payload;

    const newItemsKey = `new${__typename}s`
    const { [newItemsKey]: newItemsArray = [] } = systemInput;

    return {
        ...systemInput,
        [newItemsKey]: newItemsArray.concat(payload),
    }

}
