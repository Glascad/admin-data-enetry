export default function ADD_ITEM(systemInput, payload) {
    const { __typename } = payload;

    const [parentKey, parentPath] = Object.entries(payload).find(([key]) => key.match(/parent/i) || []);

    const newItemsKey = `new${__typename}s`
    const { [newItemsKey]: newItemsArray = [] } = systemInput;

    console.log({
        payload,
        parentPath,
        newItemsKey,
        newItemsArray,
    })

    return {
        ...systemInput,
        [newItemsKey]: newItemsArray.concat(
            {
                ...payload,
                [parentKey]: parentPath,
            }),
    }

}
