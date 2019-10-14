import { replace, removeNullValues } from "../../../../../../utils";
import { getLastItemFromPath } from "../../../../../../app-logic/system-utils";

export default function UPDATE_ITEM(systemInput, payload) {
    const {
        __typename,
        path,
        update,
    } = payload;
    const isFirstItem = !!path.match(/^\d\.\w+$/);
    const pathName = getLastItemFromPath(path);

    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`;
    const newItemsKey = `new${__typename}s`;

    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;

    const updatedItem = itemsArray.find(item => item.update ?
        path === (`${item.update.newParentPath || item.path.replace(/\.\w+$/, '')}.${item.update.name || getLastItemFromPath(path)}`)
        :
        undefined);
    const newUpdatedItem = isFirstItem ?
        newItemsArray.find(({ name }) => name === pathName)
        :
        newItemsArray.find(item => item.name === pathName && item[Object.keys(item).find(key => key.match(/parent/i))] === (path).replace(/\.\w+$/, ''));

    const updatedIndex = itemsArray.indexOf(updatedItem);
    const newUpdatedIndex = newItemsArray.indexOf(newUpdatedItem);

    console.log({
        payload,
        itemsKey,
        newItemsKey,
        itemsArray,
        newItemsArray,
        updatedItem,
        newUpdatedItem,
        updatedIndex,
        newUpdatedIndex,
    })

    const inputPayload = removeNullValues({ ...payload} || {});

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
                ...inputPayload
            })
            :
            newUpdatedItem ?
                itemsArray
                :
                itemsArray.concat(inputPayload),
    };
}