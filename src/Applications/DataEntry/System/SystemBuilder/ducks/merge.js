import _ from "lodash";
import { value } from "pg-sql2";

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
    } = {},
}) {

    const separateUpdateAndAdd = arr => _.partition(({ id }) => id);

    const [systemOptionsToUpdate, systemOptionsToAdd] = separateUpdateAndAdd(systemOptions);
    const [systemOptionValuesToUpdate, systemOptionValuesToAdd] = separateUpdateAndAdd(systemOptionValues);
    const [systemDetailTypesToUpdate, systemDetailTypesToAdd] = separateUpdateAndAdd(systemDetailTypes);
    const [detailOptionsToUpdate, detailOptionsToAdd] = separateUpdateAndAdd(detailOptions);
    const [detailOptionValuesToUpdate, detailOptionValuesToAdd] = separateUpdateAndAdd(detailOptionValues);
    const [systemConfigurationTypesToUpdate, systemConfigurationTypesToAdd] = separateUpdateAndAdd(systemConfigurationTypes);
    const [configurationOptionsToUpdate, configurationOptionsToAdd] = separateUpdateAndAdd(configurationOptions);
    const [configurationOptionValuesToUpdate, configurationOptionValuesToAdd] = separateUpdateAndAdd(configurationOptionValues);

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
                    ...optionUpdate,
                }
            }).concat(systemOptionsToAdd),
        _systemOptionValues: option._systemOptionValues
            .filter(({ id }) => !systemOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = systemOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...valueUpdate,
                }
            }).concat(systemOptionValuesToAdd),
        _systemDetailTypes: value._systemDetailTypes
            .filter(({ id }) => !systemDetailTypeIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemDetailTypesToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...typeUpdate,
                }
            }).concat(systemDetailTypesToAdd),
        _detailOptions: _detailOptions
            .filter(({ id }) => !detailOptionIdsToDelete.includes(id))
            .map(option => {

                const optionUpdate = detailOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...optionUpdate,
                }
            }).concat(detailOptionsToAdd),
        _detailOptionValues: option._detailOptionValues
            .filter(({ id }) => !detailOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = detailOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...valueUpdate,
                }
            }).concat(detailOptionValuesToAdd),
        _systemConfigurationTypes: value._systemConfigurationTypes
            .filter(({ id }) => !systemConfigurationTypeIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemConfigurationTypesToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...typeUpdate,
                }
            }).concat(systemConfigurationTypesToAdd),
        _configurationOptions: _configurationOptions
            .filter(({ id }) => !configurationOptionIdsToDelete.includes(id))
            .map(option => {

                const optionUpdate = configurationOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...optionUpdate,
                }
            }).concat(configurationOptionsToAdd),
        _configurationOptionValues: option._configurationOptionValues
            .filter(({ id }) => !configurationOptionValueIdsToDelete.includes(id))
            .map(value => {

                const valueUpdate = configurationOptionValuesToUpdate.find(({ id }) => id === value.id);
                return {
                    ...value,
                    ...valueUpdate,
                }
            }).concat(configurationOptionValuesToAdd),
    };
}