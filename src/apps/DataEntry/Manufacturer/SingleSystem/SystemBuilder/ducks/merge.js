import _ from "lodash";
import { removeNullValues, match } from '../../../../../../utils';
import { getParent, getSiblings, SystemMap, getLastItemFromPath, getParentPath, getChildren, getItemPathAddition } from "../../../../../../app-logic/system-utils";
import { getOldPath, getUpdatedPath, getParentWithUpdatedPath } from "./utils";

export default function merge(systemInput, {
    _system,
    _system: {
        id: systemId,
        // name,
        // manufacturerId,
        // systemType,
        _optionGroups = [],
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
        _systemOptionValues = [],
        _detailOptionValues = [],
        _configurationOptionValues = [],
        _systemDetails = [],
        _detailConfigurations = [],
    } = {},
}) {
    const {
        // name: newName,
        // manufacturerId: newMnfgId,
        // systemType: newSystemType,
        // delete
        pathsToDelete = [],
        optionGroupsToDelete = [],
        // update
        systemOptions = [],
        detailOptions = [],
        configurationOptions = [],
        systemOptionValues = [],
        detailOptionValues = [],
        configurationOptionValues = [],
        systemDetails = [],
        detailConfigurations = [],
        // create
        newOptionGroups = [],
        newSystemOptions = [],
        newDetailOptions = [],
        newConfigurationOptions = [],
        newSystemOptionValues = [],
        newDetailOptionValues = [],
        newConfigurationOptionValues = [],
        newSystemDetails = [],
        newDetailConfigurations = [],
    } = systemInput;

    const systemMap = new SystemMap(_system);

    const mergeArray = (oldItems, updatedItems, newItems) => oldItems
        .filter(({ path }) => {
            const updatedItem = updatedItems.find(item =>
                item.path === path
            );

            // If it is an item with updated path, it is in the right spot
            if (updatedItem) return true;

            const parentWithUpdatedPath = getParentWithUpdatedPath(systemInput, { path });


            // if the parent is updated, we look to see if the move prevents it from being deleted or not
            if (parentWithUpdatedPath) {
                // console.log("PARENT UPDATED")
                // console.log({
                //     path,
                //     parentWithUpdatedPath,
                // })
                const parentUpdatedPath = getUpdatedPath(parentWithUpdatedPath);
                return !pathsToDelete.some(deletedPath => {
                    const { input: foundDeletedItem } = deletedPath.match(new RegExp(`${parentWithUpdatedPath.path}\\b`)) || {};
                    // console.log({foundDeletedItem});
                    return foundDeletedItem && path.match(foundDeletedItem);
                });
            } else {
                // else we check to see if the path is in the deleted paths (or child of one that is)
                return !pathsToDelete.some(deletedPath => path.match(new RegExp(`${deletedPath}\\b`)));
            };
        }).map(oldItem => {
            const { path } = oldItem;
            const updatedItem = updatedItems.find(item => path === item.path);
            const [newUpdatedItemParentKey, newUpdatedItemParentPath] = updatedItem ?
                Object.entries(updatedItem.update).find(([key]) => key.match(/^parent/)) || []
                :
                [];
            const parentWithUpdatedPath = getParentWithUpdatedPath(systemInput, oldItem);
            const updatedPath = updatedItem ?
                getUpdatedPath(updatedItem)
                :
                parentWithUpdatedPath ?
                    path.replace(parentWithUpdatedPath.path, getUpdatedPath(parentWithUpdatedPath))
                    :
                    path;
            const newUpdatedItem = updatedItem || parentWithUpdatedPath ? {
                ...updatedItem ? updatedItem.update : {},
                path: updatedPath,
                name: undefined,
                [newUpdatedItemParentKey]: undefined,
            } : {};
            return {
                ...oldItem,
                ...removeNullValues(newUpdatedItem),
            };
        }).concat(newItems.map(item => {
            const { name, __typename, id } = item;
            const [parentKey, parentPath] = Object.entries(item).find(([key]) => key.match(/parent/i)) || [];
            const path = `${
                parentPath || systemId
                }.${
                match(__typename)
                    .regex(/detail$/i, '__DT__.')
                    .regex(/configuration$/i, '__CT__.')
                    .regex(/part$/i, `__PT${id}__.`)
                    .otherwise('')
                }${
                name
                }`;

            return removeNullValues({
                ...item,
                path,
                [parentKey]: undefined,
                name: undefined
            });
        }));

    const updatedSystemOptions = mergeArray(_systemOptions, systemOptions, newSystemOptions);
    const updatedSystemOptionValues = mergeArray(_systemOptionValues, systemOptionValues, newSystemOptionValues);
    const updatedDetailOptions = mergeArray(_detailOptions, detailOptions, newDetailOptions);
    const updatedDetailOptionValues = mergeArray(_detailOptionValues, detailOptionValues, newDetailOptionValues);
    const updatedConfigurationOptionValues = mergeArray(_configurationOptionValues, configurationOptionValues, newConfigurationOptionValues);
    const updatedConfigurationOptions = mergeArray(_configurationOptions, configurationOptions, newConfigurationOptions);
    const updatedSystemDetails = mergeArray(_systemDetails, systemDetails, newSystemDetails);
    const updatedDetailConfigurations = mergeArray(_detailConfigurations, detailConfigurations, newDetailConfigurations);

    return {
        // name: newName || name,
        // manufacturerId: newMnfgId || manufacturerId,
        // systemType: newSystemType || systemType,
        ..._system,
        _systemOptions: updatedSystemOptions,
        _systemOptionValues: updatedSystemOptionValues,
        _systemDetails: updatedSystemDetails,
        _detailOptions: updatedDetailOptions,
        _detailOptionValues: updatedDetailOptionValues,
        _detailConfigurations: updatedDetailConfigurations,
        _configurationOptions: updatedConfigurationOptions,
        _configurationOptionValues: updatedConfigurationOptionValues,
        _optionGroups: _optionGroups
            .filter(({ name }) => !optionGroupsToDelete.includes(name))
            .concat(newOptionGroups.map(name => ({ __typename: "OptionGroup", name })))
    };
}