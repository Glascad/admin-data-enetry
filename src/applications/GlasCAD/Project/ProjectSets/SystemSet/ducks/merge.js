
export default function merge({
    systemSetInput: {
        systemId: newSystemId,
        infillSize: newInfillSize,
        selectedOptionValues: newSelectedOptionValues = [],
        detailTypeConfigurationTypes: newDetailTypeConfigurationTypes = [],
        detailTypeConfigurationTypesToUnselect: unselectedDetailTypeConfigurationTypes = [],
    },
}, {
    systemSet: {
        id,
        infillSize,
        detailTypeConfigurationTypes = [],
        selectedOptionValues = [],
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
    console.log(arguments);
    return {
        id,
        infillSize: newInfillSize || infillSize,
        detailTypeConfigurationTypes: detailTypeConfigurationTypes,
    };
}
