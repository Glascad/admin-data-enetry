export default function DELETE_ITEM(
    systemInput,
    payload,
) {
    const {
        path,
        __typename,
    } = payload;

    const itemsKey = `${__typename.replace(__typename[0], __typename[0].toLowerCase())}s`
    const itemsToDeleteKey = `${__typename.replace(__typename[0], __typename[0].toLowerCase())}PathsToDelete`

    const { [itemsKey]: itemsArray } = systemInput;
    const { [itemsToDeleteKey]: itemsToDeleteArray = [] } = systemInput;

    const deletedItem = itemsArray.find(i => i.path === path);

    console.log({
        path,
        __typename,
        itemsKey,
        itemsToDeleteKey,
        itemsArray,
        itemsToDeleteArray,
        deletedItem
    })

    return deletedItem ? ({
        ...arguments[0],
        [itemsKey]: itemsArray.filter(i => !(i.path === path)),
    }) : ({
        ...arguments[0],
        [itemsToDeleteKey]: itemsToDeleteArray.concat(path)
    });
}