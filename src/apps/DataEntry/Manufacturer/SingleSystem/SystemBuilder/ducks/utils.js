import { getParentPath, getLastItemFromPath, getChildren, getParentTypename, getItemPathAddition } from "../../../../../../app-logic/system-utils";

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
        ||
        getLastItemFromPath(path)
        :
        item.name;

    // adds the __DT__ or __CT__ to the path
    const pathAddition = getItemPathAddition(item);
    return `${parentPath || getParentPath(item)}.${pathAddition}${name}`;
}

export const getSelectTypeName = (valueChildrenArr, name) => !valueChildrenArr.some(value => getLastItemFromPath(value.path) === name) ?
    name
    :
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


    if (__typename === partialTypename || __typename !== partialParentTypename) return false;

    return partialTypename.match(/option$/i) ?
        // Option has to be under value or type, be the terminal node, and not already have the option in the path
        (
            __typename.match(/(value|detail|configuration)$/i)
            &&
            itemChildren.length === 0
            &&
            !path.includes(partialName)
        )
        :
        partialTypename.match(/value$/i) ?
            // value needs to be under an option with the same parent name, and not already have the value in it.
            __typename.match(/option$/i)
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
                getParentTypename(partialPayload) === __typename
}