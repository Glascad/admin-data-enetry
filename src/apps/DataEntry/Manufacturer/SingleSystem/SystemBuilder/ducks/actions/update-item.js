import { getLastItemFromPath, getParentPath, getPathsTypename, getItemPathAddition } from "../../../../../../../app-logic/system-utils";
import { getOldPath, getUpdatedPath } from "../utils";

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
                                [updatedParentPathKey || `parent${getPathsTypename({ path: getParentPath(updatedPath) })}Path`]: (updatedParentPath ?
                                    updatedParentPath
                                    :
                                    getParentPath({ path: updatedPath })).replace(path, newPath),
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
