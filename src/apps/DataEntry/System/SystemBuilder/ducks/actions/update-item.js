import { removeNullValues, replace } from "../../../../../../utils";

export default function UPDATE_ITEM(
    systemInput,
    {
        __typename,
        path,
        name,
        optional,
    },
) {

    const itemsKey = `${__typename.replace(__typename[0], __typename[0].toLowerCase())}s`
    const { [itemsKey]: itemsArray = [] } = systemInput;

    const updatedItem = itemsArray.find(i => i.path === path);

    const updatedIndex = itemsArray.indexOf(updatedItem);

    return {
        ...arguments[0],
        [itemsKey]: updatedItem ?
            replace(itemsArray, updatedIndex, {
                ...updatedItem,
                ...removeNullValues({
                    __typename,
                    path: path.replace(/\w+$/, name),
                    optional,
                })
            })
            :
            itemsArray.concat({
                ...removeNullValues({
                    __typename,
                    path: path.replace(/\w+$/, name),
                    optional,
                }),
            }),
    };
}