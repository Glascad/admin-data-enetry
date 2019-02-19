import {
    removeNullValues,
} from '../../../../../utils';

export default function mergeSystemUpdate({
    // lists
    systemTagIds,
    systemTagIdsToDelete,
    infillSizes,
    infillSizesToDelete,
    infillPocketSizes,
    infillPocketSizesToDelete,
    infillPocketTypeIds,
    infillPocketTypeIdsToDelete,
    systemOptions,
    systemOptionIdsToDelete,
    invalidConfigurationTypeIds,
    invalidConfigurationTypeIdsToDelete,
    configurationOverrides,
    configurationOverridesToDelete,
    // other keys
    systemTypeId: newSystemTypeId,
    ...systemUpdate
}, {
    system: {
        // lists
        _systemSystemTags = [],
        _systemInfillSizes = [],
        _systemInfillPocketSizes = [],
        _systemInfillPocketTypes = [],
        _systemOptions = [],
        _invalidSystemConfigurationTypes = [],
        _configurationOverrides = [],
        // other keys
        systemTypeId,
        _systemType,
        ...system
    } = {},
    allSystemTypes = [],
    allSystemTags = [],
    allInfillSizes = [],
    allInfillPocketTypes = [],
    allInfillPocketSizes = [],
    allConfigurationTypes = [],
}) {
    console.log(arguments);
    return {
        // other keys
        ...system,
        ...removeNullValues(systemUpdate),
        systemTypeId: newSystemTypeId || systemTypeId,
        _systemType: newSystemTypeId === undefined || newSystemTypeId === systemTypeId ?
            _systemType
            :
            allSystemTypes.find(({ id }) => id === newSystemTypeId),
        // lists
        _systemSystemTags: _systemSystemTags
            .filter(({ systemTagId }) => !systemTagIdsToDelete
                .includes(systemTagId))
            .concat(systemTagIds
                .map(id => ({
                    _systemTag: allSystemTags
                        .find(st => st.id === id)
                }))),
        _systemInfillSizes: _systemInfillSizes
            .filter(({ size }) => !infillSizesToDelete
                .includes(size))
            .concat(infillSizes
                .map(size => ({
                    infillSize: size,
                }))),
        _systemInfillPocketSizes: _systemInfillPocketSizes
            .filter(({ size }) => !infillPocketSizesToDelete
                .includes(size))
            .concat(infillPocketSizes
                .map(size => ({
                    infillPocketSize: size,
                }))),
        _systemInfillPocketTypes: _systemInfillPocketTypes
            .filter(({ id }) => !infillPocketTypeIdsToDelete
                .includes(id))
            .concat(infillPocketTypeIds
                .map(id => ({
                    _infillPocketType: allInfillPocketTypes
                        .find(ipt => ipt.id === id)
                }))),
        _systemOptions: _systemOptions
            .filter(({ id }) => !systemOptionIdsToDelete
                .includes(id))
            .map(so => {
                const updatedOption = systemOptions
                    .find(({ id }) => id === so.id);
                return updatedOption ? {
                    ...so,
                    ...removeNullValues(updatedOption),
                    _systemOptionConfigurationTypes: so._systemOptionConfigurationTypes
                        .filter(({ configurationTypeId }) => !updatedOption.configurationTypeIdsToDelete
                            .includes(configurationTypeId))
                        .concat(updatedOption.configurationTypeIds
                            .map(configurationTypeId => ({
                                configurationTypeId,
                                _configurationType: allConfigurationTypes
                                    .find(({ id }) => id === configurationTypeId),
                            }))),
                    _optionValues: so._optionValues
                        .filter(({ id }) => !updatedOption.optionValueIdsToDelete
                            .includes(id))
                        .map(ov => {
                            const updatedValue = updatedOption.optionValues
                                .find(({ id }) => id === ov.id);
                            return updatedValue ? {
                                ...ov,
                                ...removeNullValues(updatedValue),
                            } : ov;
                        })
                        .concat(updatedOption.optionValues
                            .filter(({ id }) => typeof id === 'string')),
                } : so;
            })
            .concat(systemOptions
                .filter(({ id }) => typeof id === 'string')
                .map(so => ({
                    ...so,
                    _systemOptionConfigurationTypes: so.configurationTypeIds
                        .map(configurationTypeId => ({
                            configurationTypeId,
                            _configurationType: allConfigurationTypes
                                .find(({ id }) => id === configurationTypeId),
                        })),
                    _optionValues: so.optionValues,
                }))),
        _invalidSystemConfigurationTypes: _invalidSystemConfigurationTypes
            .filter(({ invalidConfigurationTypeId }) => !invalidConfigurationTypeIdsToDelete
                .includes(invalidConfigurationTypeId))
            .concat(invalidConfigurationTypeIds
                .map(invalidConfigurationTypeId => ({
                    invalidConfigurationTypeId,
                    _invalidConfigurationType: allConfigurationTypes
                        .find(({ id }) => id === invalidConfigurationTypeId),
                }))),
        // _configurationOverrides: _configurationOverrides
        //     .filter()
        //     .concat(),
    };
}
