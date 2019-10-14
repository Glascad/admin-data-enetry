export default function ADD_ITEM(systemInput, payload) {
    const { __typename } = payload;

    const parentKey = Object.keys(payload).find(key => key.match(/parent/i));
    const parentPath = payload[parentKey];


    const newItemsKey = `new${__typename}s`
    const { [newItemsKey]: newItemsArray = [] } = systemInput;

    return {
        ...systemInput,
        [newItemsKey]: newItemsArray.concat(
            {
                ...payload,
                [parentKey]: parentPath,
            }),
    }

}
