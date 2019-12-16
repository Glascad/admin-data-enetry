import { getChildren, getPathPrefix, getLastItemFromPath } from "../../../../../app-logic/system";
import { removeNullValues } from "../../../../../utils";
import { getParentKeyAndPathOffObject } from "../utils";
import ADD_ITEM from "./add-item";

export default function COPY_ITEM(systemInput, {
    selectedItem,
    selectedItem: {
        __typename,
        path,
        update,
        id,
      ...rest
    },
    targetItem: {
        path: newParentPath,
        __typename: parentTypename
    },
    systemMap
}) {

    const [oldParentKey, oldParentPath] = getParentKeyAndPathOffObject(selectedItem);
    const children = getChildren(selectedItem, systemMap);
    const name = update && update.name ? update.name : getLastItemFromPath(path);
    const parentPathKey = `parent${parentTypename}Path`;

    

    const updatedSystemInput = ADD_ITEM(systemInput, removeNullValues({
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