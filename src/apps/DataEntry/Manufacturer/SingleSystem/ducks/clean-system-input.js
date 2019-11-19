import { removeNullValues } from "../../../../../utils";

const removeTypenameAndNodeId = ({ __typename, nodeId, ...rest }) => rest;

const mapTypes = type => ({
    __typename, nodeId,
    update: {
        name,
        ...update
    },
    ...rest
}) => ({
    ...rest,
    update: removeNullValues({
        ...update,
        [type]: name,
    }),
});

const mapNewTypes = type => ({
    __typename, nodeId,
    name,
    ...rest
}) => ({
    ...rest,
    [type]: name,
});

export default (systemInput, system) => {

    const {
        id,
        manufacturerId,
        name: systemName,
        systemType,
    } = system;

    const {
        pathsToDelete,
        optionGroupsToDelete,
        systemOptions,
        detailOptions,
        configurationOptions,
        systemOptionValues,
        detailOptionValues,
        configurationOptionValues,
        systemDetails,
        detailConfigurations,
        newOptionGroups,
        newSystemOptions,
        newDetailOptions,
        newConfigurationOptions,
        newSystemOptionValues,
        newDetailOptionValues,
        newConfigurationOptionValues,
        newSystemDetails,
        newDetailConfigurations,
    } = systemInput;

    return {
        id,
        manufacturerId,
        name: systemName,
        systemType,
        pathsToDelete,
        optionGroupsToDelete,
        newOptionGroups,
        systemOptions: systemOptions.map(removeTypenameAndNodeId),
        detailOptions: detailOptions.map(removeTypenameAndNodeId),
        configurationOptions: configurationOptions.map(removeTypenameAndNodeId),
        systemOptionValues: systemOptionValues.map(removeTypenameAndNodeId),
        detailOptionValues: detailOptionValues.map(removeTypenameAndNodeId),
        configurationOptionValues: configurationOptionValues.map(removeTypenameAndNodeId),
        systemDetails: systemDetails.map(mapTypes('detailType')),
        detailConfigurations: detailConfigurations.map(mapTypes('configurationType')),
        newSystemOptions: newSystemOptions.map(removeTypenameAndNodeId),
        newDetailOptions: newDetailOptions.map(removeTypenameAndNodeId),
        newConfigurationOptions: newConfigurationOptions.map(removeTypenameAndNodeId),
        newSystemOptionValues: newSystemOptionValues.map(removeTypenameAndNodeId),
        newDetailOptionValues: newDetailOptionValues.map(removeTypenameAndNodeId),
        newConfigurationOptionValues: newConfigurationOptionValues.map(removeTypenameAndNodeId),
        newSystemDetails: newSystemDetails.map(mapNewTypes('detailType')),
        newDetailConfigurations: newDetailConfigurations.map(mapNewTypes('configurationType')),
    };
}