import { getChildren, getItemPathAddition, getLastItemFromPath } from "../../../../../app-logic/system-utils";
import { removeNullValues } from "../../../../../utils";
import { getParentKeyAndPathOffObject } from "../utils";
import ADD_ITEM from "./add-item";

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
    const children = getChildren(partialPayload, systemMap);
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
        partialPayload: child,
        targetItem: {
            path: `${newParentPath}.${getItemPathAddition(partialPayload)}${name}`,
            __typename,
        },
        systemMap
    }), updatedSystemInput);

}