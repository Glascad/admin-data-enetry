import { getParentPath, getLastItemFromPath, getChildren, getPathsTypename, getItemPathAddition } from "../../../../../../app-logic/system-utils";

export const getOldPath = (currentPath, systemInput) => Object.entries(systemInput)
    .reduce((allUpdatedItemsArr, [key, value]) => (key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i)) ?
        allUpdatedItemsArr.concat(value)
        :
        allUpdatedItemsArr, [])
    .reduce((resultPaths, item) => {
        const { path, update } = item;
        const [itemParentPathKey, itemParentPath] = Object.entries(update).find(([itemKey]) => itemKey.match(/parent/i)) || [];
        const updatedPathAddition = getItemPathAddition(item);
        const updatedPath = (itemParentPath || update.name) ?
            `${itemParentPath || getParentPath(item)}.${updatedPathAddition}${update.name || getLastItemFromPath(path)}`
            :
            '';

        return updatedPath
            &&
            currentPath.startsWith(updatedPath)
            &&
            (!resultPaths.longestPath || (resultPaths.longestPath && updatedPath.length > resultPaths.longestPath.length)) ?
            {
                longestPath: updatedPath,
                path: `${path}${currentPath.replace(updatedPath, '')}`,
            }
            :
            resultPaths
    }, {}).path || currentPath;

export const getUpdatedPath = item => {
    const { path, update } = item;
    const isUpdatedItem = !!update;
    const [parentPathKey, parentPath] = Object.entries(isUpdatedItem ? update : item).find(([key]) => key.match(/parent/i)) || [];
    const name = isUpdatedItem ?
        update.name
        :
        item.name

    // adds the __DT__ or __CT__ to the path
    const pathAddition = getItemPathAddition(item);
    return `${parentPath || getParentPath(item)}.${pathAddition}${name || getLastItemFromPath(path)}` || path;
}

export const getParentWithUpdatedPath = ({ path }, allUpdatedItems) => allUpdatedItems
    .reduce((parentItem, item) => {
        const newItemPath = item.path ? '' : getUpdatedPath(item);

        return path.startsWith(item.path || newItemPath) && (path !== (item.path || newItemPath)) ?
            (
                parentItem
                    &&
                    parentItem.path.length > item.path ? item.path.length : newItemPath.length
            ) || !(
                item.name || item.update.name
                ||
                Object.entries(item.update || item).some(([key]) => key.match(/parent/i))
            ) ?
                parentItem
                :
                item
            :
            parentItem
    }, undefined);

export const getSelectTypeName = (valueChildrenArr, name) => !valueChildrenArr.some(value => getLastItemFromPath(value.path) === name) ?
    name
    :
    // check: what is the underscore for?
    getSelectTypeName(valueChildrenArr, `${name}_`);

export const getIsAvailableForAction = ({ partialPayload, item }, systemMap) => {
    const { __typename: partialTypename, path: partialPath } = partialPayload;
    const partialName = getLastItemFromPath(partialPath);
    const partialParentPath = getParentPath(partialPayload);
    const {
        [partialParentPath]: {
            __typename: partialParentTypename
        }
    } = systemMap;
    const partialParentName = getLastItemFromPath(partialParentPath);
    const { __typename, path } = item;
    const itemChildren = getChildren(item, systemMap);
    const itemName = getLastItemFromPath(path);


    if (__typename === partialTypename) return false;

    return partialTypename.match(/option$/i) ?
        // Option has to be under value or type, be the terminal node, and not already have the option in the path
        (
            (
                __typename === `${partialTypename}Value`
                ||
                __typename.replace(/^.*(configuration|detail)$/i, '$1') === partialTypename.replace(/^(detail|configuration).*/i, '$1')
            )
            &&
            itemChildren.length === 0
            &&
            !path.includes(partialName)
        )
        :
        partialTypename.match(/value$/i) ?
            // value needs to be under an option with the same parent name, and not already have the value in it.
            __typename === partialTypename.replace(/value/i, '')
            &&
            partialParentName === itemName
            &&
            !itemChildren.some(s => getLastItemFromPath(s.path) === partialName)
            :
            // Type needs to be under the lowest systemOptionValue or detailOptionValue
            // doesn't already contain the type underneath it
            itemChildren.length > 0 ?
                itemChildren[0].__typename === partialTypename
                &&
                !itemChildren.some(c => getLastItemFromPath(c.path) === partialName)
                :
                getPathsTypename({ path: partialParentPath }) === __typename;
}