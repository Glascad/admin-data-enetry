import { getLastItemFromPath, getParentPath, removeDescendantPaths } from "../../../../../../../app-logic/system-utils";
import _ from 'lodash'
import { getOldPath } from "../utils";

export default function DELETE_ITEM(systemInput, payload) {
    const { path, __typename } = payload;
    const {
        [`new${__typename}s`]: newItemArray,
        pathsToDelete: initialPathsToDelete,
        systemOptions: initialSystemOptions,
        systemOptionValues: initialSystemOptionValues,
        systemDetails: initialSystemDetailTypes,
        detailOptions: initialDetailOptions,
        detailOptionValues: initialDetailOptionValues,
        systemConfigurations: initialSystemConfigurations,
        configurationOptions: initialConfigurationOptions,
        configurationOptionValues: initialConfigurationOptionValues,
    } = systemInput;

    const isNewItem = newItemArray.some(newItem => {
        const [parentKey, parentPath] = Object.entries(newItem).find(([key]) => key.match(/parent/i));
        return path === `${parentPath}.${newItem.name}`
    });

    const isUpdatedItem = systemInput[`${__typename.replace(/^./, letter => letter.toLowerCase())}s`].some(updatedItem => {
        const { path: itemPath, update } = updatedItem;
        const [parentKey, parentPath] = Object.entries(update).find(([key]) => key.match(/newParent/i)) || [];
        return path === `${parentPath || getParentPath({ path: itemPath })}.${update.name || getLastItemFromPath(itemPath)}`
    });

    const partitionDeletedItems = itemArray => itemArray.reduce(([updated, deleted], item) => {
        const { path: itemPath, update: itemUpdate } = item;
        const [parentPathKey, parentPath] = Object.entries(itemUpdate)
            .find(([itemKey, itemValue]) => itemKey.match(/parent/i)) || [];
        const updatedPath = `${parentPath || getParentPath({ path: itemPath })}.${itemUpdate.name || getLastItemFromPath(itemPath)}`;

        return updatedPath.includes(path) ?
            [updated, deleted.concat(getOldPath(systemInput, updatedPath))]
            :
            [updated.concat(item), deleted]
    }, [[], []]);

    // delete all new items that include the deleted path
    const updatedNewItems = Object.entries(systemInput)
        .filter(([key]) => key.match(/^new/i) && !key.match(/groups/))
        .reduce((updatedSystemInput, [key, value]) => ({
            ...updatedSystemInput,
            [key]: value.filter(item => {
                const { name } = item;
                const [parentPathKey, parentPath] = Object.entries(item)
                    .find(([itemKey, itemValue]) => itemKey.match(/parent/i)) || [];
                return !(`${parentPath}.${key.match(/details$/i) ? '__DT__.' : ''}${key.match(/configurations$/i) ? '__CT__.' : ''}${name}`.startsWith(path));
            })
        }), {});

    // finds the original paths of all updated paths that need to be deleted and adds them to paths to delete,
    // filters out the items that need to be deleted from the updated state.
    const [systemOptions, systemOptionsToDelete] = partitionDeletedItems(initialSystemOptions);
    const [systemOptionValues, systemOptionValuesToDelete] = partitionDeletedItems(initialSystemOptionValues);
    const [systemDetailTypes, systemDetailTypesToDelete] = partitionDeletedItems(initialSystemDetailTypes);
    const [detailOptions, detailOptionsToDelete] = partitionDeletedItems(initialDetailOptions);
    const [detailOptionValues, detailOptionValuesToDelete] = partitionDeletedItems(initialDetailOptionValues);
    const [systemConfigurations, systemConfigurationsToDelete] = partitionDeletedItems(initialSystemConfigurations);
    const [configurationOptions, configurationOptionsToDelete] = partitionDeletedItems(initialConfigurationOptions);
    const [configurationOptionValues, configurationOptionValuesToDelete] = partitionDeletedItems(initialConfigurationOptionValues);
    const pathsToDelete = [
        ...initialPathsToDelete,
        ...systemOptionsToDelete,
        ...systemOptionValuesToDelete,
        ...systemDetailTypesToDelete,
        ...detailOptionsToDelete,
        ...detailOptionValuesToDelete,
        ...systemConfigurationsToDelete,
        ...configurationOptionsToDelete,
        ...configurationOptionValuesToDelete,
    ];
    
    return {
        ...systemInput,
        ...updatedNewItems,
        systemOptions,
        systemOptionValues,
        systemDetailTypes,
        detailOptions,
        detailOptionValues,
        systemConfigurations,
        configurationOptions,
        configurationOptionValues,
        pathsToDelete: removeDescendantPaths(pathsToDelete.concat(isNewItem || isUpdatedItem || pathsToDelete.includes(path) ? [] : path)),
    }
}