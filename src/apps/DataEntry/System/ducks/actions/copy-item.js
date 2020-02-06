import { getChildren, getLastItemFromPath, getPathPrefix } from "../../../../../app-logic/system";
import { getParentPathFromObject } from "../../../../../app-logic/system";
import { removeNullishValues } from "../../../../../utils";
import ADD_ITEM from "./add-item";

export default function COPY_ITEM(systemInput, {
    selectedItem,
    selectedItem: {
        __typename,
        path,
        update,
        id,
        fakeId,
        _part,
        ...rest
    },
    targetItem: {
        path: newParentPath,
        __typename: parentTypename
    },
    systemMap
}) {
    console.log(arguments);

    const [oldParentKey, oldParentPath] = getParentPathFromObject(selectedItem);
    const children = getChildren(selectedItem, systemMap);
    console.log({
        children,
        systemMap,
        selectedItem,
    });
    const name = update && update.name ? update.name : getLastItemFromPath(path);
    const parentPathKey = `parent${parentTypename}Path`;



    const updatedSystemInput = ADD_ITEM(systemInput, removeNullishValues({
        ...rest,
        [oldParentKey]: undefined,
        [parentPathKey]: newParentPath,
        name,
        __typename,
    }));

    return children.reduce((newSystemInput, child) => COPY_ITEM(newSystemInput, {
        selectedItem: child,
        targetItem: {
            path: `${newParentPath}.${getPathPrefix(selectedItem)}${name}`,
            __typename,
        },
        systemMap
    }), updatedSystemInput);

}