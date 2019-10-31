import { getLastItemFromPath, getParentPath, getParentTypename } from "../../../../../../../app-logic/system-utils";
import { getOldPath } from "../utils";

export default function UPDATE_ITEM(systemInput, payload) {
    const {
        __typename,
        path,
        update,
    } = payload;

    console.log(payload);

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
    const updatedItem = itemsArray.find(item => item.path === oldPath);
    // if it is a new item, the parent needs to be the same as the path from parent, and the name needs to be the same as the last item on the path
    const updatedNewItem = newItemsArray.find(item => Object.entries(item).find(([key, value]) =>
        key.match(/parent/)
        &&
        path === `${value}.${item.name}`
    ));

    // getting the new Path to update Items
    const [newParentPathKey, newParentPath] = (Object.entries(update).find(([key]) => key.match(/parent/i)))
        ||
        ['', parentPath];
    const newName = update.name || getLastItemFromPath(path);
    const newPath = `${newParentPath}.${newName}`;

    // finds all new items that need to be updated
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const [parentPathKey, itemParentPath] = Object.entries(item)
                    .find(([itemKey, itemValue]) => itemKey.match(/parent/i)) || [];
                console.log({
                    itemParentPath,
                    path,
                    doesItMatch: !!path.match(/^\d+\.\w+$/),
                    notParent: !itemParentPath,
                    item,
                    update,
                });
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
        .filter(([key]) => key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const { update: itemUpdate, path: itemPath } = item;
                const [updatedParentPathKey, updatedParentPath] = Object.entries(itemUpdate).find(([itemKey]) => itemKey.match(/parent/i)) || [];
                const updatedPath = `${updatedParentPath || getParentPath(item)}.${itemUpdate.name || getLastItemFromPath(itemPath)}`;

                // console.log({
                //     item,
                //     itemPath,
                //     updatedParentPathKey,
                //     updatedParentPath,
                //     updatedPath
                // });

                return (updatedParentPath || getParentPath({ path: updatedPath })).startsWith(parentPath) ?
                    updatedPath === path ?
                        {
                            ...item,
                            update: {
                                ...itemUpdate,
                                ...update,
                            }
                        }
                        :
                        {
                            ...item,
                            update: {
                                ...itemUpdate,
                                [updatedParentPathKey || `newParent${getParentTypename({ path: updatedPath })}`]: (updatedParentPath ?
                                    updatedParentPath
                                    :
                                    getParentPath({ path: updatedPath }))
                                    .replace(path, newPath),
                            }
                        }
                    :
                    item
            }).concat((key === itemsKey && !updatedItem && !updatedNewItem) ?
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