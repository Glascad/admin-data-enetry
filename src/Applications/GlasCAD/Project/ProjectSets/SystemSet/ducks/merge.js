
export default function merge({
    systemSetInput: {
        systemId: newSystemId,
        infillSize: newInfillSize,
        selectedOptionValues: newSelectedOptionValues = [],
        detailTypeConfigurationTypes: newDetailTypeConfigurationTypes = [],
        detailTypeConfigurationTypesToUnselect: newDetailTypeConfigurationTypesToUnselect = [],
    },
}, {
    systemSet: {
        id,
        infillSize: oldInfillSize,
        detailTypeConfigurationTypes: oldDetailTypeConfigurationTypes = [],
        detailTypeConfigurationTypesToUnselect: oldDetailTypeConfigurationTypesToUnselect = [],
        selectedOptionValues: oldSelectedOptionValues = [],
        system: {
            id: systemId,
            infillSizes = [],
            manufacturer: {
                id: manufacturerId,
                name: manufacturerName,
            } = {},
            systemType: {
                id: systemTypeId,
                name: systemTypeName,
            } = {},
        } = {},
    } = {},
}) {
    // console.log(arguments);

    return {
        id,
        infillSize: newInfillSize || oldInfillSize,
        detailTypeConfigurationTypes: oldDetailTypeConfigurationTypes,
        selectedOptionValues: oldSelectedOptionValues,
    };
}
