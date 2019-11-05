import { getChildren, getLastItemFromPath } from "../../../../../../../app-logic/system-utils";
import ADD_ITEM from "./add-item";
import { getUpdatedPath } from "../utils";

export default function COPY_ITEM(systemInput, {
    partialPayload,
    targetItem,
    systemMap
}) {

    const { __typename, path, update, ...rest  } = partialPayload;
    const itemChildren = getChildren(partialPayload, systemMap);
    const name = update && update.name ? update.name : getLastItemFromPath(path);
    const newParentPath = getUpdatedPath(targetItem);
    const parentPathKey = `parent${targetItem.__typename}Path`;

    const updatedSystemInput = ADD_ITEM(systemInput, {
        ...rest,
        [parentPathKey]: newParentPath,
        name,
        __typename,
    });

    return itemChildren.reduce((newSystemInput, child) => COPY_ITEM(newSystemInput, {
        partialPayload: child,
        targetItem: {
            path: `${newParentPath}.${name}`,
            __typename,
        },
        systemMap
    }), updatedSystemInput);

}