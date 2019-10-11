import { replace, removeNullValues } from "../../../../../../utils";
import { getLastItemFromPath } from "../../../../../../app-logic/system-utils";

export default function UPDATE_ITEM(systemInput, {
    __typename,
    path,
    newPath,
    update,
    update: {
        parentPath,
        name,
    },
}) {
    const isFirstItem = !!(newPath || path).match(/^\d\.\w+$/);
    const pathName = getLastItemFromPath(newPath || path);

    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`;
    const newItemsKey = `new${__typename}s`;

    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;

    const updatedItem = itemsArray.find(item => item.update
        &&
        (newPath || path) === (
            `${
            item.update.parentPath
            ||
            item.path.replace(/\.\w+$/, '')
            }.${
            item.update.name
            ||
            getLastItemFromPath(newPath || path)}`
        )
    );

    const newUpdatedItem = isFirstItem ?
        newItemsArray.find(({ name }) => name === pathName)
        :
        newItemsArray.find(item => item.name === pathName && item[Object.keys(item).find(key => key.match(/parent/i))] === (newPath || path).replace(/\.\w+$/, ''));

    const updatedIndex = itemsArray.indexOf(updatedItem);
    const newUpdatedIndex = newItemsArray.indexOf(newUpdatedItem);

    const finalUpdate = removeNullValues({
        __typename,
        path,
        newPath: undefined,
    } || {});

    console.log({
        itemsKey,
        newItemsKey,
        itemsArray,
        newItemsArray,
        updatedItem,
        newUpdatedItem,
        updatedIndex,
        newUpdatedIndex,
    });

    return {
        ...systemInput,
        [newItemsKey]: newUpdatedItem ?
            replace(newItemsArray, newUpdatedIndex, {
                ...newUpdatedItem,
                ...update,
            })
            :
            newItemsArray,
        [itemsKey]: updatedItem ?
            replace(itemsArray, updatedIndex, {
                ...updatedItem,
                ...finalUpdate
            })
            :
            newUpdatedItem ?
                itemsArray
                :
                itemsArray.concat(finalUpdate),
    };
}