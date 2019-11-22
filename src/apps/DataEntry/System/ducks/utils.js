import { memoize } from 'lodash';
import { match } from '../../../../utils';
import { getChildren, getItemPathAddition, getLastItemFromPath, getParentPath } from "../../../../app-logic/system-utils";

export const getOldPath = memoize((currentPath, systemInput) => Object.entries(systemInput)
    .reduce((allUpdatedItemsArr, [key, value]) => (key.match(/options$|values$|details$|configurations$/i) && !key.match(/new/i)) ?
        allUpdatedItemsArr.concat(value)
        :
        allUpdatedItemsArr, [])
    .reduce((resultPaths, item) => {
        const { path, update } = item;
        const [itemParentPathKey, itemParentPath] = getParentKeyAndPathOffObject(update);
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
    }, {}).path || currentPath);

export const getUpdatedPath = memoize(item => {
    const { path, update } = item;
    const isUpdatedItem = !!update;
    const [parentPathKey, parentPath] = getParentKeyAndPathOffObject(isUpdatedItem ? update : item);
    const name = isUpdatedItem ?
        update.name
        :
        item.name

    // adds the __DT__ or __CT__ to the path
    const pathAddition = getItemPathAddition(item);
    return `${parentPath || getParentPath(item)}.${pathAddition}${name || getLastItemFromPath(path)}` || path;
});

export const getParentWithUpdatedPath = (systemInput, { path }) => {
    const {
        systemOptions,
        detailOptions,
        configurationOptions,
        systemOptionValues,
        detailOptionValues,
        configurationOptionValues,
        systemDetails,
        detailConfigurations,
    } = systemInput;

    const allItemLists = [
        ...systemOptions,
        ...detailOptions,
        ...configurationOptions,
        ...systemOptionValues,
        ...detailOptionValues,
        ...configurationOptionValues,
        ...systemDetails,
        ...detailConfigurations,
    ];

    return allItemLists.reduce((parentItem, item) => {
        // console.log({ item, parentItem })

        return path.startsWith(item.path) && (path !== item.path) ?
            (
                parentItem
                &&
                parentItem.path.length > item.path.length
            ) || !(
                item.update.name
                ||
                Object.entries(item.update).some(([key]) => key.match(/parent/i))
            ) ?
                parentItem
                :
                item
            :
            parentItem
    }, undefined);
};

export const getSelectTypeName = (valueChildrenArr, name) => !valueChildrenArr.some(value => getLastItemFromPath(value.path) === name) ?
    name
    :
    // check: what is the underscore for?
    getSelectTypeName(valueChildrenArr, `${name}_`);

export const getPotentialParent = memoize(({ partialPayload, item }, systemMap) => {
    const { __typename: partialTypename, path: partialPath } = partialPayload;
    const partialName = getLastItemFromPath(partialPath);
    const partialParentPath = getParentPath(partialPayload);
    const partialParentName = getLastItemFromPath(partialParentPath);
    const { __typename, path } = item;
    const itemChildren = getChildren(item, systemMap);
    const itemName = getLastItemFromPath(path);

    if (__typename === partialTypename) return false;

    return match(partialTypename)
        .regex(/option$/i,
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
        )
        .regex(/value$/i,
            // value needs to be under an option with the same parent name, and not already have the value in it.
            __typename === partialTypename.replace(/value/i, '')
            &&
            partialParentName === itemName
            &&
            !itemChildren.some(value => getLastItemFromPath(value.path) === partialName)
        )
        .otherwise(
            // Type needs to be under the lowest systemOptionValue or detailOptionValue
            // or Type can be under another type
            // doesn't already contain the type underneath it
            itemChildren.length > 0 ?
                itemChildren[0].__typename === partialTypename
                &&
                !itemChildren.some(child => getLastItemFromPath(child.path) === partialName)
                :
                partialTypename.replace(/^(system|detail|configuration).*/i, '$1') === __typename.replace(/^.*(system|detail|configuration)$/i, '$1')
                ||
                partialTypename.replace(/^(system|detail|configuration).*/i, '$1') === __typename.replace(/^(system|detail|configuration).*value/i, '$1')
        )
});

export const getParentKeyAndPathOffObject = object => Object.entries(object).find(([key]) => key.match(/parent/i)) || [];

export const getOptionIsGrouped = ({ _optionGroups }, item) => {
    const optionPath = match(item.__typename)
        .regex(/value$/i, getParentPath(item))
        .regex(/option$/i, item.path)
        .otherwise('');
    return _optionGroups.some(({ name }) => name === getLastItemFromPath(optionPath));
};