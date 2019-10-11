import { getNameFromPath } from "../../../../../../app-logic/system-utils";

export default function DELETE_ITEM(systemInput, payload) {
    const parentKey = Object.keys(payload).find(item => item.match(/parent/i));

    const { __typename, path, [parentKey]: parentPath } = payload;

    const newItemsKey = `new${__typename}s`;
    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`;
    const pathsToDeleteKey = 'pathsToDelete';

    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
        [pathsToDeleteKey]: pathsToDeleteArray = [],
    } = systemInput;

    const deleteNewItem = newItemsArray.find(item => (item[parentKey] === parentPath) && (getNameFromPath(path) === item.name));

    console.log({
        payload,
        path,
        parentKey,
        parentPath,
        newItemsKey,
        itemsKey,
        newItemsArray,
        itemsArray,
        pathsToDeleteArray,
        deleteNewItem
    })

    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.filter(item => !Object.entries(item)
                .some(([key, value]) => key.match(/parent/i) && value.includes(path)))
        }), {});


    return deleteNewItem ? ({
        ...systemInput,
        ...updatedNewItems,
        [newItemsKey]: newItemsArray.filter(item => !(item === deleteNewItem)),
    }) : ({
        ...systemInput,
        ...updatedNewItems,
        [itemsKey]: itemsArray.filter(item => !(item.path === path)),
        [pathsToDeleteKey]: pathsToDeleteArray.concat(path),
    });
}