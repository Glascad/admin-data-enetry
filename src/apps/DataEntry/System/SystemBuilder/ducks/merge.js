import _ from "lodash";
import { removeNullValues } from '../../../../../utils';
import { getParent, getSiblings, SystemMap, getNameFromPath, getParentPath, getChildren } from "../../../../../app-logic/system-utils";

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

    const mergeItem = (oldItems, updatedItems, newItems, optionValues) => oldItems
        .filter(({ path }) => !pathsToDelete.some(deletedPath => path.includes(deletedPath)))
        .map(oldItem => {
            const { path, __typename } = oldItem;
            const updatedItem = updatedItems.find(item => item.path === path);
            const newParentKey = updatedItem ?
                Object.keys(updatedItem.update).find(key => key.match(/newParent/))
                :
                '';

            const newParentPath = updatedItem && updatedItem.update ?
                updatedItem.update[newParentKey] || getParentPath({ path: updatedItem.path })
                :
                getParentPath(path);

            const newItemName = updatedItem ?
                (updatedItem.update.name
                    ||
                    getNameFromPath(updatedItem.path))
                :
                getNameFromPath(path);

            const newPath = `${newParentPath}.${newItemName}`

            const defaultValueKey = optionValues ?
                `default${__typename}Value`
                :
                '';

            const defaultValue = oldItem[defaultValueKey];
            const optionValueDefaultPath = `${path}.${defaultValue}`;
            const defaultValueExists = optionValues ?
                !!optionValues.some(value => value.path === optionValueDefaultPath)
                :
                true;

            // const newItem = defaultValueExists ?
            //     {}
            //     :
            //     console.log("GOING THROUGH")
            //     ||
            //     {
            //         [defaultValueKey]: getNameFromPath(optionValues.length > 0 ? optionValues[0].path : '')
            //     };

            const newUpdatedItem = updatedItem ?
                {
                    ...updatedItem.update,
                    newPath,
                    name: undefined,
                    [newParentKey]: undefined,
                }
                :
                {};
            // console.log({
            //     oldItems,
            //     updatedItems,
            //     newItems,
            //     path,
            //     defaultValueKey,
            //     defaultValue,
            //     defaultValueExists,
            //     optionValueDefaultPath,
            //     newUpdatedItem,
            //     newItem,
            //     optionValues,
            // })

            // console.log({
            //     oldItems,
            //     updatedItems,
            //     newItems,
            //     optionValues,
            //     path,
            //     newParentPath,
            //     newPath,
            //     newItemName,
            //     updatedItem,
            //     newParentKey,
            //     defaultValueKey,
            //     defaultValue,
            //     optionValuesKey,
            //     updateDefaultValue,
            //     newUpdatedItem,
            // })

            return {
                ...oldItem,
                ...removeNullValues(newUpdatedItem),
            };
        }).concat(newItems.map(item => {
            const { __typename, name } = item;
            const parentKey = Object.keys(item).find(key => key.match(/parent/i));
            const path = `${item[parentKey] || systemId}.${name}`;

            return {
                path,
                __typename,
            }
        }));

    console.log(arguments);
    // console.log({systemMap});

    const updatedSystemOptionValues = mergeItem(_systemOptionValues, systemOptionValues, newSystemOptionValues);
    const updatedDetailOptionValues = mergeItem(_detailOptionValues, detailOptionValues, newDetailOptionValues);
    const updatedConfigurationOptionValues = mergeItem(_configurationOptionValues, configurationOptionValues, newConfigurationOptionValues);
    console.log({
        updatedSystemOptionValues,
        updatedDetailOptionValues,
        updatedConfigurationOptionValues,
    })
    const updatedSystemOptions = mergeItem(_systemOptions, systemOptions, newSystemOptions, updatedSystemOptionValues);
    const updatedDetailOptions = mergeItem(_detailOptions, detailOptions, newDetailOptions, updatedDetailOptionValues);
    const updatedConfigurationOptions = mergeItem(_configurationOptions, configurationOptions, newConfigurationOptions, updatedConfigurationOptionValues);
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