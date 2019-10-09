import _ from "lodash";
import { removeNullValues } from '../../../../../utils';

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

    const mergeItem = (_systemList, inputList, newInputList) => _systemList
        .filter(({ path }) => !pathsToDelete.includes(path))
        .map(item => {
            const itemUpdate = inputList.find(({ path }) => path === item.path);
            return {
                ...item,
                ...removeNullValues(itemUpdate ? itemUpdate.update : {}),
            }
        }).concat(newInputList.map(i => ({
            path: `${i[Object.keys(i).find(k => k.match(/parent/i))] || systemId}.${i.name}`,
            __typename: i.__typename
        })));

    console.log(arguments[0], arguments[1]);

    return {
        // name: newName || name,
        // manufacturerId: newMnfgId || manufacturerId,
        // systemType: newSystemType || systemType,
        ..._system,
        _systemOptions: mergeItem(_systemOptions, systemOptions, newSystemOptions),
        _systemOptionValues: mergeItem(_systemOptionValues, systemOptionValues, newSystemOptionValues),
        _systemDetails: mergeItem(_systemDetails, systemDetails, newSystemDetails),
        _detailOptions: mergeItem(_detailOptions, detailOptions, newDetailOptions),
        _detailOptionValues: mergeItem(_detailOptionValues, detailOptionValues, newDetailOptionValues),
        _systemConfigurations: mergeItem(_systemConfigurations, systemConfigurations, newSystemConfigurations),
        _configurationOptions: mergeItem(_configurationOptions, configurationOptions, newConfigurationOptions),
        _configurationOptionValues: mergeItem(_configurationOptionValues, configurationOptionValues, newConfigurationOptionValues),
    };
}