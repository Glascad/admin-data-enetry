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
    systemDetails = [],
    systemConfigurations = [],
    systemOptionIdsToDelete = [],
    detailOptionIdsToDelete = [],
    configurationOptionIdsToDelete = [],
    systemOptionValueIdsToDelete = [],
    detailOptionValueIdsToDelete = [],
    configurationOptionValueIdsToDelete = [],
    systemDetailIdsToDelete = [],
    systemConfigurationIdsToDelete = [],
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
        _systemDetails = [],
        _systemConfigurations = [],
    } = {},
}) {

    const separateUpdateFromAdd = arr => _.partition(arr, ({ id }) => id);

    const [systemOptionsToUpdate, systemOptionsToAdd] = separateUpdateFromAdd(systemOptions);
    const [systemOptionValuesToUpdate, systemOptionValuesToAdd] = separateUpdateFromAdd(systemOptionValues);
    const [systemDetailsToUpdate, systemDetailsToAdd] = separateUpdateFromAdd(systemDetails);
    const [detailOptionsToUpdate, detailOptionsToAdd] = separateUpdateFromAdd(detailOptions);
    const [detailOptionValuesToUpdate, detailOptionValuesToAdd] = separateUpdateFromAdd(detailOptionValues);
    const [systemConfigurationsToUpdate, systemConfigurationsToAdd] = separateUpdateFromAdd(systemConfigurations);
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
        _systemDetails: _systemDetails
            .filter(({ id }) => !systemDetailIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemDetailsToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...removeNullValues(typeUpdate),
                }
            }).concat(systemDetailsToAdd),
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
        _systemConfigurations: _systemConfigurations
            .filter(({ id }) => !systemConfigurationIdsToDelete.includes(id))
            .map(type => {
                const typeUpdate = systemConfigurationsToUpdate.find(({ id }) => id === type.id);
                return {
                    ...type,
                    ...removeNullValues(typeUpdate),
                }
            }).concat(systemConfigurationsToAdd),
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