import _ from "lodash";
import { removeNullValues } from '../../../../../../utils';
import { getParent, getSiblings, SystemMap, getLastItemFromPath, getParentPath, getChildren, getItemPathAddition } from "../../../../../../app-logic/system-utils";

export default function merge({
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
    systemConfigurations = [],
    // create
    newOptionGroups = [],
    newSystemOptions = [],
    newDetailOptions = [],
    newConfigurationOptions = [],
    newSystemOptionValues = [],
    newDetailOptionValues = [],
    newConfigurationOptionValues = [],
    newSystemDetails = [],
    newSystemConfigurations = [],
}, {
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
        _systemConfigurations = [],
    } = {},
}) {
    const systemMap = new SystemMap(_system);

    const allUpdatedItems = [
        ...systemOptions,
        ...detailOptions,
        ...configurationOptions,
        ...systemOptionValues,
        ...detailOptionValues,
        ...configurationOptionValues,
        ...systemDetails,
        ...systemConfigurations,
    ];

    console.log({ _system, systemMap });

    const mergeArray = (oldItems, updatedItems, newItems) => oldItems
        .filter(({ path }) => !pathsToDelete.some(deletedPath => path.startsWith(deletedPath) && !path.startsWith(`${deletedPath}_`)))
        .map(oldItem => {
            const { path } = oldItem;
            const updatedItem = updatedItems.find(item => path === item.path);
            const newParentKey = updatedItem ?
                Object.keys(updatedItem.update).find(key => key.match(/^parent/))
                :
                '';
            const updatedParent = allUpdatedItems.reduce((parentItem, item) => path.startsWith(item.path) && path !== item.path ?
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
                parentItem, undefined)


            // Adding __DT__ or __CT__ in the path
            const updatedItemPathAddition = updatedItem ?
                getItemPathAddition(updatedItem)
                :
                '';

            const updatedParentPathAddition = updatedParent ?
                getItemPathAddition(updatedParent)
                :
                '';

            console.log({
                A: updatedItemPathAddition,
                B: updatedParentPathAddition,
                C: path,
            })
            const newUpdatedParentKey = updatedParent ?
                Object.keys(updatedParent.update).find(key => key.match(/^parent/))
                :
                '';

            const newParentPath = updatedItem ?
                updatedItem.update[newParentKey] || getParentPath(updatedItem)
                :
                updatedParent ?
                    getParentPath({
                        path: path.replace(updatedParent.path,
                            `${updatedParent.update[newUpdatedParentKey]
                            ||
                            getParentPath(updatedParent)}.${updatedParentPathAddition}${
                            updatedParent.update.name
                            ||
                            getLastItemFromPath(updatedParent.path)
                            }`)
                    })
                    :
                    getParentPath(oldItem);

            const newItemName = updatedItem ?
                (updatedItem.update.name
                    ||
                    getLastItemFromPath(updatedItem.path))
                :
                getLastItemFromPath(path);

            const newPath = `${newParentPath}.${updatedItemPathAddition}${newItemName}`

            const newUpdatedItem = updatedItem || updatedParent ? {
                ...updatedItem ? updatedItem.update : {},
                path: newPath,
                name: undefined,
                [newParentKey]: undefined,
            } : {};

            return {
                ...oldItem,
                ...removeNullValues(newUpdatedItem),
            };
        })
        .concat(newItems.map(item => {
            const { name, __typename } = item;
            const parentKey = Object.keys(item).find(key => key.match(/parent/i));
            const path = `${item[parentKey] || systemId}.${__typename.match(/detail$/i) ? '__DT__.' : ''}${__typename.match(/configuration$/i) ? '__CT__.' : ''}${name}`;

            return removeNullValues({
                ...item,
                path,
                [parentKey]: undefined,
                name: undefined
            });
        }));

    // console.log({systemMap});

    const updatedSystemOptions = mergeArray(_systemOptions, systemOptions, newSystemOptions);
    const updatedSystemOptionValues = mergeArray(_systemOptionValues, systemOptionValues, newSystemOptionValues);
    const updatedDetailOptions = mergeArray(_detailOptions, detailOptions, newDetailOptions);
    const updatedDetailOptionValues = mergeArray(_detailOptionValues, detailOptionValues, newDetailOptionValues);
    const updatedConfigurationOptionValues = mergeArray(_configurationOptionValues, configurationOptionValues, newConfigurationOptionValues);
    const updatedConfigurationOptions = mergeArray(_configurationOptions, configurationOptions, newConfigurationOptions);
    const updatedSystemDetails = mergeArray(_systemDetails, systemDetails, newSystemDetails);
    const updatedSystemConfigurations = mergeArray(_systemConfigurations, systemConfigurations, newSystemConfigurations);

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
        _optionGroups: _optionGroups.filter(({ name }) => !optionGroupsToDelete.includes(name)).concat(newOptionGroups.map(name => ({ __typename: "OptionGroup", name })))
    };
}