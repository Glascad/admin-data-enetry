import { getLastItemFromPath, getParentPath, getParentPathFromObject, getPathPrefix, getTypenameFromPath } from "../../../../../app-logic/system";
import { removeNullValues } from "../../../../../utils";
import { getOldPath, getParentWithUpdatedPath, getUpdatedPath } from "../utils";

export default function UPDATE_ITEM(systemInput, payload) {
    // console.log(arguments);
    const {
        id,
        fakeId,
        __typename,
        path,
        update,
    } = payload;

    // console.log({ payload });

    const parentPath = getParentPath(payload);
    const name = getLastItemFromPath(path)

    // Finds the previous item in state (if exists)
    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`; // systemOptionValues
    const newItemsKey = `new${__typename}s`; // newSystemOptionValues
    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;
    // console.log({ parentPath, name, itemsKey, newItemsKey, __typename, path });

    // if the path and initial path are the same, the item is the same
    const oldPath = getOldPath(path, systemInput);
    // console.log({ oldPath });
    const updatedItem = itemsArray.find(item =>
        item.path === oldPath
        &&
        item.id === id
        &&
        item.fakeId === fakeId
    );
    // if it is a new item, the parent needs to be the same as the path from parent, and the name needs to be the same as the last item on the path
    const updatedNewItem = newItemsArray.find(item => {
        const [parentKey, parentPath] = getParentPathFromObject(item);
        return (
            path === `${parentPath}.${getPathPrefix(payload)}${item.name}`
            &&
            item.fakeId === fakeId
        )
    });

    const newPath = getUpdatedPath(payload);

    // If item is not in state && item doesn't have a parent update key, 
    // it needs to see if a parent is in state is has moved to add it to the update.
    const [updateParentKey, updateParentPath] = getParentPathFromObject(update);
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
                const [parentPathKey, itemParentPath] = getParentPathFromObject(item);
                return itemParentPath && itemParentPath.startsWith(parentPath) ?
                    item === updatedNewItem ?
                        removeNullValues(
                            {
                                ...item,
                                [parentPathKey]: updateParentKey ? undefined : itemParentPath,
                                ...update,
                            }
                        )
                        :
                        {
                            ...item,
                            [parentPathKey]: itemParentPath.replace(path, newPath),
                        }
                    :
                    item;
            })
        }), {});

    // finds all updated items that need to be updated
    const updatedItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/(option|value|detail|configuration|part)s$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const { update: itemUpdate } = item;
                const [updatedParentPathKey, updatedParentPath] = getParentPathFromObject(itemUpdate);
                const updatedPath = getUpdatedPath(item);

                return (updatedParentPath || getParentPath({ path: updatedPath })).startsWith(parentPath) ?
                    removeNullValues(
                        item === updatedItem ?
                            {
                                ...item,
                                update: {
                                    ...itemUpdate,
                                    [updatedParentPathKey]: updateParentKey ? undefined : updatedParentPath,
                                    ...update,
                                }
                            } : {
                                ...item,
                                update: {
                                    ...itemUpdate,
                                    [
                                        updatedParentPathKey
                                        ||
                                        `parent${getTypenameFromPath(getParentPath({ path: updatedPath }))}Path`
                                    ]: getParentPath({ path: updatedPath }).replace(path, newPath),
                                },
                            }
                    )
                    :
                    item
            }).concat((key === itemsKey && !updatedItem && !updatedNewItem) ?
                parentWithUpdatedPath ?
                    {
                        __typename,
                        path: oldPath,
                        update: {
                            ...update,
                            [`parent${getTypenameFromPath(parentPath)}Path`]: getParentPath(parentPath),
                        },
                    }
                    :
                    {
                        __typename,
                        path: oldPath,
                        update,
                    }
                : []),
        }), {});

    const result = {
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
    };

    // console.log({ result });

    return result;
}
