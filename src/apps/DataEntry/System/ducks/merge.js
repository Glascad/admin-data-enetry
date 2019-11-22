import { match, removeNullValues } from '../../../../utils';
import { getParentKeyAndPathOffObject, getParentWithUpdatedPath, getUpdatedPath } from "./utils";

export default function merge(systemInput, {
    _system,
    _system: {
        id: systemId,
        name,
        systemType,
        sightline,
        _optionGroups = [],
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
        _systemOptionValues = [],
        _detailOptionValues = [],
        _configurationOptionValues = [],
        _systemDetails = [],
        _detailConfigurations = [],
        _configurationParts = [],
    } = {},
}) {
    const {
        name: newName,
        systemType: newSystemType,
        sightline: newSightline,
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
        configurationParts = [],
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
        newConfigurationParts = [],
    } = systemInput;

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
            //     console.log("PARENT UPDATED")
            //     console.log({
            //         path,
            //         parentWithUpdatedPath,
            //     })
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
        })
        .map(oldItem => {
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
        })
        .concat(newItems.map(item => {
            const { name, __typename = '', id, fakeId } = item;
            const [parentKey, parentPath] = getParentKeyAndPathOffObject(item);
            const path = `${
                parentPath || systemId
                }.${
                match(__typename)
                    .regex(/detail$/i, '__DT__.')
                    .regex(/configuration$/i, '__CT__.')
                    .regex(/part$/i, `__PT${id || fakeId}__.`)
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
    const updatedConfigurationParts = mergeArray(_configurationParts, configurationParts, newConfigurationParts);

    return {
        ..._system,
        name: newName || name,
        sightline: newSightline || sightline,
        systemType: newSystemType || systemType,
        _systemOptions: updatedSystemOptions,
        _systemOptionValues: updatedSystemOptionValues,
        _systemDetails: updatedSystemDetails,
        _detailOptions: updatedDetailOptions,
        _detailOptionValues: updatedDetailOptionValues,
        _detailConfigurations: updatedDetailConfigurations,
        _configurationParts: updatedConfigurationParts,
        _configurationOptions: updatedConfigurationOptions,
        _configurationOptionValues: updatedConfigurationOptionValues,
        _optionGroups: _optionGroups
            .filter(({ name }) => !optionGroupsToDelete.includes(name))
            .concat(newOptionGroups.map(name => ({ __typename: "OptionGroup", name })))
    };
}