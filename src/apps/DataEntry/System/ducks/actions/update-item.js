import { getItemPathAddition, getLastItemFromPath, getParentPath, getTypenameFromPath } from "../../../../../app-logic/system-utils";
import { removeNullValues } from "../../../../../utils";
import { getOldPath, getParentKeyAndPathOffObject, getParentWithUpdatedPath, getUpdatedPath } from "../utils";

export default function UPDATE_ITEM(systemInput, payload) {
    // console.log(arguments);
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
    // console.log({ parentPath, name, itemsKey, newItemsKey, __typename, path });

    // if the path and initial path are the same, the item is the same
    const oldPath = getOldPath(path, systemInput);
    // console.log({ oldPath });
    const updatedItem = itemsArray.find(item => item.path === oldPath);
    // if it is a new item, the parent needs to be the same as the path from parent, and the name needs to be the same as the last item on the path
    // console.log({ updatedItem });
    const updatedNewItem = newItemsArray.find(item => Object.entries(item).find(([key, value]) =>
        key.match(/parent/)
        &&
        path === `${value}.${getItemPathAddition(payload)}${item.name}`
    ));
    // console.log({ updatedNewItem });

    const newPath = getUpdatedPath(payload);

    // console.log({ newPath });

    // If item is not in state && item doesn't have a parent update key, 
    // it needs to see if a parent is in state is has moved to add it to the update.
    const [updateParentKey, updateParentPath] = getParentKeyAndPathOffObject(update);
    const parentWithUpdatedPath = !updatedItem && !updatedNewItem && !updateParentKey ?
        getParentWithUpdatedPath(systemInput, { path: oldPath })
        :
        undefined;

    // console.log({ parentWithUpdatedPath, updateParentKey });

    // finds all new items that need to be updated
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.map(item => {
                const [parentPathKey, itemParentPath] = getParentKeyAndPathOffObject(item);
                return !itemParentPath && path.match(/^\d+\.\w+$/) ?
                    {
                        ...item,
                        ...update,
                    }
                    :
                    itemParentPath && itemParentPath.startsWith(parentPath) ?
                        (itemParentPath === parentPath) && (item.name === name) ?
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
                                name: item.name,
                            }
                        :
                        item;
            })
        }), {});

    // console.log({ updatedNewItems });
    // finds all updated items that need to be updated
    const updatedItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/(option|value|detail|configuration|part)s$/i) && !key.match(/new/i))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            n: console.log({ key, value, }),
            [key]: value.map(item => {
                const { update: itemUpdate } = item;
                const [updatedParentPathKey, updatedParentPath] = getParentKeyAndPathOffObject(itemUpdate);
                const updatedPath = getUpdatedPath(item);

                return (updatedParentPath || getParentPath({ path: updatedPath })).startsWith(parentPath) ?
                    removeNullValues(
                        updatedPath === path ?
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
                                        console.log({
                                            path,
                                            updatedPath,
                                            parentPath: getParentPath(updatedPath),
                                            type: getTypenameFromPath(getParentPath(updatedPath))
                                        })
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
                        ...payload,
                        path: oldPath,
                        update: {
                            ...update,
                            [`parent${getTypenameFromPath(parentPath)}Path`]: getParentPath(parentPath),
                        },
                    }
                    :
                    {
                        ...payload,
                        path: oldPath,
                    }
                : []),
        }), {});

    // console.log({ updatedItems });

    const result = {
        ...systemInput,
        ...updatedItems,
        ...updatedNewItems,
    };

    // console.log({ result });

    return result;
}
