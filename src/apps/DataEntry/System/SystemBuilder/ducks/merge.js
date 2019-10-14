import _ from "lodash";
import { removeNullValues } from '../../../../../utils';
import { getParent, getSiblings, SystemMap, getLastItemFromPath, getParentPath, getChildren } from "../../../../../app-logic/system-utils";

export default function merge({
    // name: newName,
    // manufacturerId: newMnfgId,
    // systemType: newSystemType,
    systemOptions = [],
    newSystemOptions = [],
    detailOptions = [],
    newDetailOptions = [],
    configurationOptions = [],
    newConfigurationOptions = [],
    systemOptionValues = [],
    newSystemOptionValues = [],
    detailOptionValues = [],
    newDetailOptionValues = [],
    configurationOptionValues = [],
    newConfigurationOptionValues = [],
    systemDetails = [],
    newSystemDetails = [],
    systemConfigurations = [],
    newSystemConfigurations = [],
    pathsToDelete = [],
}, {
    _system,
    _system: {
        id: systemId,
        // name,
        // manufacturerId,
        // systemType,
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
        _systemOptionValues = [],
        _detailOptionValues = [],
        _configurationOptionValues = [],
        _systemDetails = [],
        _systemConfigurations = [],
    } = {},
}) {
    const systemMap = new SystemMap(_system);
    console.log({ _system, systemMap });

    const mergeItem = (oldItems, updatedItems, newItems) => oldItems
        .filter(({ path }) => !pathsToDelete.some(deletedPath => path.includes(deletedPath)))
        .map(oldItem => {
            const { path } = oldItem;
            const updatedItem = updatedItems.find(item => path === item.path);
            const newParentKey = updatedItem ?
                Object.keys(updatedItem.update).find(key => key.match(/newParent/))
                :
                '';

            const newParentPath = updatedItem && updatedItem.update ?
                updatedItem.update[newParentKey] || getParentPath(updatedItem)
                :
                getParentPath(oldItem);

            const newItemName = updatedItem ?
                (updatedItem.update.name
                    ||
                    getLastItemFromPath(updatedItem.path))
                :
                getLastItemFromPath(path);

            const newPath = `${newParentPath}.${newItemName}`

            const newUpdatedItem = updatedItem ?
                {
                    ...updatedItem.update,
                    newPath,
                    name: undefined,
                    [newParentKey]: undefined,
                }
                :
                {}

            return {
                ...oldItem,
                ...removeNullValues(newUpdatedItem),
            };
        }).concat(newItems.map(item => {
            const { name } = item;
            const parentKey = Object.keys(item).find(key => key.match(/parent/i));
            const path = `${item[parentKey] || systemId}.${name}`;

            return removeNullValues({
                ...item,
                path,
                [parentKey]: undefined,
                name: undefined
            })
        }))

    console.log(arguments);
    // console.log({systemMap});

    const updatedSystemOptions = mergeItem(_systemOptions, systemOptions, newSystemOptions);
    const updatedSystemOptionValues = mergeItem(_systemOptionValues, systemOptionValues, newSystemOptionValues);
    const updatedDetailOptions = mergeItem(_detailOptions, detailOptions, newDetailOptions);
    const updatedDetailOptionValues = mergeItem(_detailOptionValues, detailOptionValues, newDetailOptionValues);
    const updatedConfigurationOptionValues = mergeItem(_configurationOptionValues, configurationOptionValues, newConfigurationOptionValues);
    const updatedConfigurationOptions = mergeItem(_configurationOptions, configurationOptions, newConfigurationOptions);
    const updatedSystemDetails = mergeItem(_systemDetails, systemDetails, newSystemDetails);
    const updatedSystemConfigurations = mergeItem(_systemConfigurations, systemConfigurations, newSystemConfigurations);

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
        _systemConfigurations: updatedSystemConfigurations,
        _configurationOptions: updatedConfigurationOptions,
        _configurationOptionValues: updatedConfigurationOptionValues,
    };
}