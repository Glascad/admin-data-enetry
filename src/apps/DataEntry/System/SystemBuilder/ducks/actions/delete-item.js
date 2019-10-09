import { getNameFromPath } from "../../../../../../app-logic/system-utils";

export default function DELETE_ITEM(systemInput, payload) {
    const parentKey = Object.keys(payload).find(i => i.match(/parent/i));

    const { __typename, path, [parentKey]: parentPath } = payload;

    const newItemsKey = `new${__typename}s`;
    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`;
    const pathsToDeleteKey = 'pathsToDelete';

    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
        [pathsToDeleteKey]: pathsToDeleteArray = [],
    } = systemInput;

    const deleteNewItem = newItemsArray.find(i => (i[parentKey] === parentPath) && (getNameFromPath(path) === i.name));

    console.log({
        payload,
        parentKey,
        parentPath,
        newItemsKey,
        itemsKey,
        newItemsArray,
        itemsArray,
        pathsToDeleteArray,
        deleteNewItem
    })

    return deleteNewItem ? ({
        ...systemInput,
        [newItemsKey]: newItemsArray.filter(i => !(i === deleteNewItem)),
    }) : ({
        ...systemInput,
        [itemsKey]: itemsArray.filter(i => !(i.path === path)),
        [pathsToDeleteKey]: pathsToDeleteArray.concat(path),
    });
}