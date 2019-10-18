import { replace, removeNullValues } from "../../../../../../../utils";
import { getLastItemFromPath, getParentPath } from "../../../../../../../app-logic/system-utils";

export default function UPDATE_ITEM(systemInput, payload) {
    const {
        __typename,
        path: initialPath,
        update,
    } = payload;
    //Finds the previous item in state (if exists)
    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`; //systemOptionValues
    const newItemsKey = `new${__typename}s`; //newSystemOptionValues
    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;
    //if the path and initial path are the same, the item is the same
    const updatedItem = itemsArray.find(item => item.path === initialPath);
    //if it is a new item, the parent needs to be the same as the path from parent, and the name needs to be the same as the last item on the path
    const updatedNewItem = newItemsArray.find(item => Object.entries(item).find(([key, value]) =>
        key.match(/parent/)
        &&
        value === getParentPath(payload)
        &&
        item.name === getLastItemFromPath(initialPath)
    ));

    //finding the current path for finding children
    const currentParentPath = updatedItem ?
        (Object.entries(updatedItem.update).find(([key]) => key.match(/parent/i)) || [])[1] || getParentPath(payload)
        :
        getParentPath(payload);

    const currentName = updatedItem ?
        updatedItem.update.name || getLastItemFromPath(initialPath)
        :
        getLastItemFromPath(initialPath);

    const currentPath = `${currentParentPath}.${currentName}`;

    //finding the new path for changing the current to new
    const newParentPath = (Object.entries(update).find(([key]) => key.match(/parent/i)) || [])[1]
        ||
        currentParentPath;
    const newName = update.name || currentName;
    const newPath = `${newParentPath}.${newName}`;

    //finds all new items that need to be updated
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const [parentPathKey, parentPath] = Object.entries(item)
                    .find(([itemKey, itemValue]) => itemKey.match(/parent/i) && itemValue.includes(currentParentPath)) || ['',''];
                return parentPath ?
                    (parentPath === currentParentPath) && (item.name === currentName) ?
                        {
                            ...item,
                            [parentPathKey]: newParentPath,
                            name: newName,
                        }
                        :
                        {
                            ...item,
                            [parentPathKey]: parentPath.replace(currentPath, newPath)
                        }
                    :
                    item;
            })
        }), {});

    //finds all updated items that need to be updated
    const updatedItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const { update: itemUpdate } = item;
                const updated = item.path.includes(initialPath);
                return updated ?
                    item.path === initialPath ?
                        {
                            ...item,
                            update: {
                                ...itemUpdate,
                                // ["parentPathKey"]: newParentPath,
                                name: newName,
                            }
                        }
                        :
                        {
                            ...item,
                            update: {
                                ...itemUpdate,
                                // ["parentPathKey"]: parentPath.replace(currentPath, newPath),
                            }
                        }
                    :
                    item
            }).concat((key === itemsKey && !updatedItem && !updatedNewItem) ? payload : [])
        }), {});

    console.log({
        itemsKey,
        newItemsKey,
        itemsArray,
        newItemsArray,
        updatedItem,
        updatedNewItem,
        currentParentPath,
        currentName,
        currentPath,
        newParentPath,
        newName,
        newPath,
        updatedNewItems,
        updatedItems,
    })

    return {
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
    };
}