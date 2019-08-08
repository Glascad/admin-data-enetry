import {
    removeNullValues, logInputOutput,
} from '../../../../../../utils';

export default logInputOutput("Merge System Update", ({
    // lists
    // systemTagIds,
    // systemTagIdsToDelete,
    // infillSizes,
    // infillSizesToDelete,
    // infillPocketSizes,
    // infillPocketSizesToDelete,
    // infillPocketTypes,
    // infillPocketTypesToDelete,
    systemOptions,
    systemOptionIdsToDelete,
    invalidSystemConfigurationTypes,
    invalidSystemConfigurationTypesToDelete,
    configurationOverrides,
    configurationOverridesToDelete,
    // other keys
    systemType: newSystemType,
    manufacturerId: newManufacturerId,
    ...systemUpdate
}, {
    _system: {
        // lists
        // _systemSystemTags = [],
        // _systemInfillSizes = [],
        // _systemInfillPocketSizes = [],
        // _systemInfillPocketTypes = [],
        _systemOptions = [],
        _invalidSystemConfigurationTypes = [],
        _systemConfigurationOverrides = [],
        // other keys
        manufacturerId,
        _manufacturer,
        systemType,
        _systemType,
        // _systemType: {
        //     _systemTypeDetailTypeConfigurationTypes = [],
        // } = {},
        ..._system
    } = {},
    allManufacturers = [],
    allSystemTypes = [],
    // allSystemTags = [],
    // allInfillSizes = [],
    // allInfillPocketTypes = [],
    // allInfillPocketSizes = [],
    allConfigurationTypes = [],
}) => ({
    // other keys
    ..._system,
    ...removeNullValues(systemUpdate),
    manufacturerId: newManufacturerId || manufacturerId,
    _manufacturer: newManufacturerId === undefined || newManufacturerId === manufacturerId ?
        _manufacturer
        :
        allManufacturers.find(({ id }) => id === newManufacturerId),
    systemType: newSystemType || systemType,
    _systemType: newSystemType === undefined || newSystemType === systemType ?
        _systemType
        :
        allSystemTypes.find(({ type }) => type === newSystemType),
    // _systemType: newSystemType === undefined || newSystemType === systemType ?
    //     _systemType
    //     :
    //     allSystemTypes.find(({ id }) => id === newSystemType),
    // lists
    // _systemSystemTags: _systemSystemTags
    //     .filter(({ systemTagId }) => !systemTagIdsToDelete
    //         .includes(systemTagId))
    //     .concat(systemTagIds
    //         .map(id => ({
    //             _systemTag: allSystemTags
    //                 .find(st => st.id === id)
    //         }))),
    // _systemInfillSizes: _systemInfillSizes
    //     .filter(({ infillSize }) => !infillSizesToDelete
    //         .includes(infillSize))
    //     .concat(infillSizes
    //         .map(size => ({
    //             infillSize: size,
    //         }))),
    // _systemInfillPocketSizes: _systemInfillPocketSizes
    //     .filter(({ infillPocketSize }) => !infillPocketSizesToDelete
    //         .includes(infillPocketSize))
    //     .concat(infillPocketSizes
    //         .map(size => ({
    //             infillPocketSize: size,
    //         }))),
    // _systemInfillPocketTypes: _systemInfillPocketTypes
    //     .filter(({ infillPocketType }) => !infillPocketTypesToDelete
    //         .includes(infillPocketType))
    //     .concat(infillPocketTypes
    //         .map(id => ({
    //             _infillPocketType: allInfillPocketTypes
    //                 .find(ipt => ipt.id === id)
    //         }))),
    _systemOptions: _systemOptions
        .filter(({ id }) => !systemOptionIdsToDelete
            .includes(id))
        .map(so => {
            const updatedOption = systemOptions
                .find(({ id }) => id === so.id);
            return updatedOption ? {
                ...so,
                ...removeNullValues(updatedOption),
                // _systemOptionConfigurationTypes: so._systemOptionConfigurationTypes
                //     .filter(({ configurationType }) => !updatedOption.configurationTypeToDelete
                //         .includes(configurationType))
                //     .concat(updatedOption.configurationType
                //         .map(configurationType => ({
                //             configurationType,
                //             _configurationType: allConfigurationTypes
                //                 .find(({ id }) => id === configurationType),
                //         }))),
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
                _systemOptionConfigurationTypes: so.configurationType
                    .map(configurationType => ({
                        configurationType,
                        _configurationType: allConfigurationTypes
                            .find(({ id }) => id === configurationType),
                    })),
                _optionValues: so.optionValues,
            }))),
    _invalidSystemConfigurationTypes: _invalidSystemConfigurationTypes
        .filter(({ invalidConfigurationType }) => !invalidSystemConfigurationTypesToDelete
            .some(ict => invalidConfigurationType === ict.invalidConfigurationType))
        .concat(invalidSystemConfigurationTypes
            // .map(ict => console.log(ict) || ict)
            // .map(invalidConfigurationType => ({
            //     invalidConfigurationType,
            //     _invalidConfigurationType: allConfigurationTypes
            //         .find(({ id }) => id === invalidConfigurationType),
            // }))
        ),
    _systemConfigurationOverrides: _systemConfigurationOverrides
        .filter(({
            systemType: stid,
            detailType,
            configurationType,
        }) => stid === (newSystemType || systemType)
            &&
            !configurationOverridesToDelete
                .some(o => o.detailType === detailType
                    &&
                    o.configurationType === configurationType))
        .map(o => {
            const updatedOverride = configurationOverrides
                .find(({ detailType, configurationType }) => o.detailType === detailType
                    &&
                    o.configurationType === configurationType);
            return updatedOverride ? {
                ...o,
                ...removeNullValues(updatedOverride),
            } : o;
        })
        .concat(configurationOverrides
            .filter(o => !_systemConfigurationOverrides
                .find(({ detailType, configurationType }) => o.detailType === detailType
                    &&
                    o.configurationType === configurationType))
            .map(o => ({
                ...o,
                systemType: newSystemType || systemType,
            }))),
}));
