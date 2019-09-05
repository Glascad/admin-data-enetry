import _ from "lodash";
import { value } from "pg-sql2";

export default function merge({
    // name: newName,
    // manufacturerId: newMnfgId,
    // systemType: newSystemType,
    systemOptions = [],
    detailOptions = [],
    configurationOptions = [],
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

    const [systemOptionsToUpdate, systemOptionsToAdd] = _.partition(systemOptions, ({ id }) => id);
    const [detailOptionsToUpdate, detailOptionsToAdd] = _.partition(detailOptions, ({ id }) => id);
    const [configurationOptionsToUpdate, configurationOptionsToAdd] = _.partition(configurationOptions, ({ id }) => id);


    return {
        // name: newName || name,
        // manufacturerId: newMnfgId || manufacturerId,
        // systemType: newSystemType || systemType,
        ..._system,
        _systemOptions: _systemOptions
            .filter(({ id }) => !systemOptionIdsToDelete.includes(id))
            .map(option => {

                const [systemOptionValuesToUpdate, systemOptionValuesToAdd] = _.partition(option._systemOptionValues, ({ id }) => id);

                const optionUpdate = systemOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...optionUpdate,
                    _systemOptionValues: option._systemOptionValues
                        .filter(({ id }) => !systemOptionValueIdsToDelete.includes(id))
                        .map(value => {

                            const [systemDetailTypesToUpdate, systemDetailTypesToAdd] = _.partition(value._systemDetailTypes, ({ id }) => id);

                            const valueUpdate = systemOptionValuesToUpdate.find(({ id }) => id === value.id);
                            return {
                                ...value,
                                ...valueUpdate,
                                _systemDetailTypes: value._systemDetailTypes
                                    .filter(({ id }) => !systemDetailTypeIdsToDelete.includes(id))
                                    .map(type => {
                                        const typeUpdate = systemDetailTypesToUpdate.find(({ id }) => id === type.id);
                                        return {
                                            ...type,
                                            ...typeUpdate,
                                        }
                                    }).concat(systemDetailTypesToAdd)
                            }
                        }).concat(systemOptionValuesToAdd)
                }
            }).concat(systemOptionsToAdd),

        _detailOptions: _detailOptions
            .filter(({ id }) => !detailOptionIdsToDelete.includes(id))
            .map(option => {

                const [detailOptionValuesToUpdate, detailOptionValuesToAdd] = _.partition(option._detailOptionValues, ({ id }) => id);

                const optionUpdate = detailOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...optionUpdate,
                    _detailOptionValues: option._detailOptionValues
                        .filter(({ id }) => !detailOptionValueIdsToDelete.includes(id))
                        .map(value => {

                            const [systemConfigurationTypesToUpdate, systemConfigurationTypesToAdd] = _.partition(value._systemConfigurationTypes, ({ id }) => id);

                            const valueUpdate = detailOptionValuesToUpdate.find(({ id }) => id === value.id);
                            return {
                                ...value,
                                ...valueUpdate,
                                _systemConfigurationTypes: value._systemConfigurationTypes
                                    .filter(({ id }) => !systemConfigurationTypeIdsToDelete.includes(id))
                                    .map(type => {
                                        const typeUpdate = systemConfigurationTypesToUpdate.find(({ id }) => id === type.id);
                                        return {
                                            ...type,
                                            ...typeUpdate,
                                        }
                                    }).concat(systemConfigurationTypesToAdd)
                            }
                        }).concat(detailOptionValuesToAdd)
                }
            }).concat(detailOptionsToAdd),

        _configurationOptions: _configurationOptions
            .filter(({ id }) => !configurationOptionIdsToDelete.includes(id))
            .map(option => {

                const [configurationOptionValuesToUpdate, configurationOptionValuesToAdd] = _.partition(option._configurationOptionValues, ({ id }) => id);

                const optionUpdate = configurationOptionsToUpdate.find(({ id }) => id === option.id);
                return {
                    ...option,
                    ...optionUpdate,
                    _configurationOptionValues: option._configurationOptionValues
                        .filter(({ id }) => !configurationOptionValueIdsToDelete.includes(id))
                        .map(value => {

                            const valueUpdate = configurationOptionValuesToUpdate.find(({ id }) => id === value.id);
                            return {
                                ...value,
                                ...valueUpdate,
                            }
                        }).concat(configurationOptionValuesToAdd)
                }
            }).concat(configurationOptionsToAdd),

    }
}