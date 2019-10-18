import { getLastItemFromPath } from "../../../../../../../app-logic/system-utils";

export default function DELETE_ITEM(systemInput, payload) {
    const parentKey = Object.keys(payload).find(item => item.match(/parent/i));

    const { __typename, path, newPath, [parentKey]: parentPath } = payload;

    const newItemsKey = `new${__typename}s`;

    const {
        [newItemsKey]: newItemsArray = [],
        pathsToDelete: pathsToDeleteArray = [],
    } = systemInput;

    const deleteNewItem = newItemsArray.find(item => (item[parentKey] === parentPath) && (getLastItemFromPath(path) === item.name));

    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.filter(item => !Object.entries(item)
                .some(([key, itemValues]) => key.match(/parent/i) && itemValues.includes(newPath || path)))
        }), {});

    const updatedItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.filter(item => !(item.newPath || item.path).includes(newPath || path))
        }), {});

    return deleteNewItem ? ({
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
    }) : ({
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
        pathsToDelete: pathsToDeleteArray.filter(deletedItem => !deletedItem.includes(path)).concat(path),
    });
}