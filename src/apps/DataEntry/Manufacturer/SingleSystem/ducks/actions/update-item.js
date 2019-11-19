import { getLastItemFromPath, getParentPath, getPathsTypename, getItemPathAddition, getTypenameFromPath } from "../../../../../../app-logic/system-utils";
import { getOldPath, getUpdatedPath, getParentWithUpdatedPath } from "../utils";

export default function UPDATE_ITEM(systemInput, payload) {
    const {
        __typename,
        path,
        update,
    } = payload;

    const parentPath = getParentPath(payload);
    const name = getLastItemFromPath(path)

    // Finds the previous item in state (if exists)
    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`; // systemOptionValues
    const newItemsKey = `new${__typename}s`; // newSystemOptionValues
    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;

    // if the path and initial path are the same, the item is the same
    const oldPath = getOldPath(path, systemInput);
    console.log({ oldPath });
    const updatedItem = itemsArray.find(item => item.path === oldPath);
    // if it is a new item, the parent needs to be the same as the path from parent, and the name needs to be the same as the last item on the path
    const updatedNewItem = newItemsArray.find(item => Object.entries(item).find(([key, value]) =>
        key.match(/parent/)
        &&
        path === `${value}.${getItemPathAddition(payload)}${item.name}`
    ));

    const newPath = getUpdatedPath(payload);

    // If item is not in state && item doesn't have a parent update key, 
    // it needs to see if a parent is in state is has moved to add it to the update.
    const [updateParentKey, updateParentPath] = Object.entries(update).find(([key]) => key.match(/parent/i)) || [];
    const parentWithUpdatedPath = !updatedItem && !updatedNewItem && !updateParentKey ?
        getParentWithUpdatedPath(systemInput, { path: oldPath })
        :
        undefined;

    // finds all new items that need to be updated
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const [parentPathKey, itemParentPath] = Object.entries(item)
                    .find(([itemKey]) => itemKey.match(/parent/i)) || [];
                return !itemParentPath && !!path.match(/^\d+\.\w+$/) ?
                    {
                        ...item,
                        ...update
                    }
                    :
                    itemParentPath && itemParentPath.startsWith(parentPath) ?
                        (itemParentPath === parentPath) && (item.name === name) ?
                            {
                                ...item,
                                ...update
                            }
                            :
                            {
                                ...item,
                                [parentPathKey]: itemParentPath.replace(path, newPath),
                                name: item.name
                            }
                        :
                        item;
            })
        }), {});

    // finds all updated items that need to be updated
    const updatedItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/(option|value|detail|configuration)s$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const { update: itemUpdate } = item;
                const [updatedParentPathKey, updatedParentPath] = Object.entries(itemUpdate).find(([itemKey]) => itemKey.match(/parent/i)) || [];
                const updatedPath = getUpdatedPath(item);

                return (updatedParentPath || getParentPath({ path: updatedPath })).startsWith(parentPath) ?
                    updatedPath === path ?
                        {
                            ...item,
                            update: {
                                ...itemUpdate,
                                ...update,
                            }
                        } : {
                            ...item,
                            update: {
                                ...itemUpdate,
                                [
                                    updatedParentPathKey
                                    ||
                                    `parent${getPathsTypename({ path: getParentPath(updatedPath) })}Path`
                                ]: getParentPath({ path: updatedPath }).replace(path, newPath),
                            }
                        }
                    :
                    item
            }).concat((key === itemsKey && !updatedItem && !updatedNewItem) ?
                parentWithUpdatedPath ?
                    {
                        ...payload,
                        path: oldPath,
                        update: {
                            ...update,
                            [`parent${getTypenameFromPath(getParentPath(payload))}Path`]: getParentPath(payload),
                        }
                    }
                    :
                    {
                        ...payload,
                        path: oldPath,
                    }
                : [])
        }), {});

    return {
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
    };
}
