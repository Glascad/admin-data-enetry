import { getChildren, getLastItemFromPath } from "../../../../../app-logic/system-utils";
import ADD_ITEM from "./add-item";
import { getUpdatedPath, getParentKeyAndPathOffObject } from "../utils";
import { removeNullValues } from "../../../../../utils";

export default function COPY_ITEM(systemInput, {
    partialPayload,
    partialPayload: {
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

    const [oldParentKey, oldParentPath] = getParentKeyAndPathOffObject(partialPayload);
    const itemChildren = getChildren(partialPayload, systemMap);
    const name = update && update.name ? update.name : getLastItemFromPath(path);
    const parentPathKey = `parent${parentTypename}Path`;

    const updatedSystemInput = ADD_ITEM(systemInput, removeNullValues({
        ...rest,
        [oldParentKey]: undefined,
        [parentPathKey]: newParentPath,
        name,
        __typename,
    }));

    return itemChildren.reduce((newSystemInput, child) => COPY_ITEM(newSystemInput, {
        partialPayload: child,
        targetItem: {
            path: `${newParentPath}.${name}`,
            __typename,
        },
        systemMap
    }), updatedSystemInput);

}