import { replace } from "../../../../../../utils";
import { getNameFromPath } from "../../../../../../app-logic/system-utils";

export default function UPDATE_ITEM(systemInput, payload) {
    const {
        __typename,
        path,
        update,
    } = payload;
    const isFirstItem = !!path.match(/^\d\.\w+$/);
    const pathName = getNameFromPath(path);

    const itemsKey = `${__typename.replace(/^./, f => f.toLowerCase())}s`;
    const newItemsKey = `new${__typename}s`;

    const {
        [itemsKey]: itemsArray = [],
        [newItemsKey]: newItemsArray = [],
    } = systemInput;

    const updatedItem = itemsArray.find(i => i.path === path);
    const newUpdatedItem = isFirstItem ?
        newItemsArray.find(({ name }) => name === pathName)
        :
        newItemsArray.find(i => i.name === pathName && i[Object.keys(i).find(key => key.match(/parent/i))] === path.replace(/\.\w+$/, ''));

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
                ...payload
            })
            :
            newUpdatedItem ?
                itemsArray
                :
                itemsArray.concat(payload),
    };
}