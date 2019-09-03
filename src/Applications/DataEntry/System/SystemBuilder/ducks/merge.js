import _ from "lodash";

export default function merge({
    // name: newName,
    // manufacturerId: newMnfgId,
    // systemType: newSystemType,
    systemOptions,
    detailOptions,
    configurationOptions,
    systemOptionIdsToDelete,
    detailOptionIdsToDelete,
    configurationOptionIdsToDelete,
    systemOptionValueIdsToDelete,
    detailOptionValueIdsToDelete,
    configurationOptionValueIdsToDelete,
    systemDetailTypeIdsToDelete,
    systemConfigurationTypeIdsToDelete,
}, {
    _system,
    _system: {
        // name,
        // manufacturerId,
        // systemType,
        _systemOptions,
        _detailOptions,
        _configurationOptions,
    } = {},
}) {

    const [systemOptionsToUpdate, systemOptionsToAdd] = _.partition(systemOptions, ({ id }) => id);
    const [detailOptionsToUpdate, detailOptionsToAdd] = _.partition(detailOptions, ({ id }) => id);
    const [configurationOptionsToUpdate, configurationOptionsToAdd] = _.partition(configurationOptions, ({ id }) => id);

    return {
        // name: sName || name,
        // manufacturerId: sMId || manufacturerId,
        // systemType: sSystemType || systemType,
        ..._system,
        // systemOptions: systemOptionIdsToDelete
    }
}