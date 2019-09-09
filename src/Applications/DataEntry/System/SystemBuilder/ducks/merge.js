import _ from "lodash";
import { removeNullValues } from '../../../../../utils';

export default function merge({
    // name: newName,
    // manufacturerId: newMnfgId,
    // systemType: newSystemType,
    systemOptions = [],
    detailOptions = [],
    configurationOptions = [],
    systemOptionValues = [],
    detailOptionValues = [],
    configurationOptionValues = [],
    systemDetailTypes = [],
    systemConfigurationTypes = [],
    systemOptionIdsToDelete = [],
    detailOptionIdsToDelete = [],
    configurationOptionIdsToDelete = [],
    systemOptionValueIdsToDelete = [],
    detailOptionValueIdsToDelete = [],
    configurationOptionValueIdsToDelete = [],
    systemDetailTypeIdsToDelete = [],
    systemConfigurationTypeIdsToDelete = [],
}, {
    _system,
    _system: {
        // name,
        // manufacturerId,
        // systemType,
        _systemOptions = [],
        _detailOptions = [],
        _configurationOptions = [],
        _systemOptionValues = [],
        _detailOptionValues = [],
        _configurationOptionValues = [],
        _systemDetailTypes = [],
        _systemConfigurationTypes = [],
    } = {},
}) {

    const separateUpdateFromAdd = arr => _.partition(arr, ({ id }) => id);

    const [systemOptionsToUpdate, systemOptionsToAdd] = separateUpdateFromAdd(systemOptions);
    const [systemOptionValuesToUpdate, systemOptionValuesToAdd] = separateUpdateFromAdd(systemOptionValues);
    const [systemDetailTypesToUpdate, systemDetailTypesToAdd] = separateUpdateFromAdd(systemDetailTypes);
    const [detailOptionsToUpdate, detailOptionsToAdd] = separateUpdateFromAdd(detailOptions);
    const [detailOptionValuesToUpdate, detailOptionValuesToAdd] = separateUpdateFromAdd(detailOptionValues);
    const [systemConfigurationTypesToUpdate, systemConfigurationTypesToAdd] = separateUpdateFromAdd(systemConfigurationTypes);
    const [configurationOptionsToUpdate, configurationOptionsToAdd] = separateUpdateFromAdd(configurationOptions);
    const [configurationOptionValuesToUpdate, configurationOptionValuesToAdd] = separateUpdateFromAdd(configurationOptionValues);

    return {
        // name: newName || name,
        // manufacturerId: newMnfgId || manufacturerId,
        // systemType: newSystemType || systemType,
        ..._system,
        _systemOptions: _systemOptions
            .filter(({ id }) => !systemOptionIdsToDelete.includes(id))
            .map(option => {

                const optionUpdate = systemOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...removeNullValues(optionUpdate),
                }
            }).concat(systemOptionsToAdd),
        _systemOptionValues: _systemOptionValues
            .filter(({ id }) => !systemOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = systemOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...removeNullValues(valueUpdate),
                }
            }).concat(systemOptionValuesToAdd),
        _systemDetailTypes: _systemDetailTypes
            .filter(({ id }) => !systemDetailTypeIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemDetailTypesToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...removeNullValues(typeUpdate),
                }
            }).concat(systemDetailTypesToAdd),
        _detailOptions: _detailOptions
            .filter(({ id }) => !detailOptionIdsToDelete.includes(id))
            .map(option => {

                const optionUpdate = detailOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...removeNullValues(optionUpdate),
                }
            }).concat(detailOptionsToAdd),
        _detailOptionValues: _detailOptionValues
            .filter(({ id }) => !detailOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = detailOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...removeNullValues(valueUpdate),
                }
            }).concat(detailOptionValuesToAdd),
        _systemConfigurationTypes: _systemConfigurationTypes
            .filter(({ id }) => !systemConfigurationTypeIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemConfigurationTypesToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...removeNullValues(typeUpdate),
                }
            }).concat(systemConfigurationTypesToAdd),
        _configurationOptions: _configurationOptions
            .filter(({ id }) => !configurationOptionIdsToDelete.includes(id))
            .map(option => {

                const optionUpdate = configurationOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...removeNullValues(optionUpdate),
                }
            }).concat(configurationOptionsToAdd),
        _configurationOptionValues: _configurationOptionValues
            .filter(({ id }) => !configurationOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = configurationOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...removeNullValues(valueUpdate),
                }
            }).concat(configurationOptionValuesToAdd),
    };
}