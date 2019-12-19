import { removeNullValues } from "../../../../utils";
import { getConfigurationPartIdFromPath } from "../../../../app-logic/system";

const removeTypenameAndNodeIdAndFakeId = ({ __typename, nodeId, fakeId, parentSystemPath, ...rest }) => rest; // Change the PatentSystemPath when creating

const mapTypes = type => ({
    __typename,
    nodeId,
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
    __typename,
    nodeId,
    name,
    fakeId,
    ...rest
}) => ({
    ...rest,
    [type]: name,
});

const mapParts = ({
    __typename,
    nodeId,
    path,
    name,
    fakeId,
    ...rest
}) => removeNullValues({
    ...rest,
    id: getConfigurationPartIdFromPath(path),
});

export default ({
    name,
    manufacturerId,
    systemType,
    sightline,
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
    configurationParts,
    newOptionGroups,
    newSystemOptions,
    newDetailOptions,
    newConfigurationOptions,
    newSystemOptionValues,
    newDetailOptionValues,
    newConfigurationOptionValues,
    newSystemDetails,
    newDetailConfigurations,
    newConfigurationParts
}, {
    id,
}) => ({
    id,
    manufacturerId,
    name,
    systemType,
    sightline,
    pathsToDelete,
    optionGroupsToDelete,
    newOptionGroups,
    systemOptions: systemOptions.map(removeTypenameAndNodeIdAndFakeId),
    detailOptions: detailOptions.map(removeTypenameAndNodeIdAndFakeId),
    configurationOptions: configurationOptions.map(removeTypenameAndNodeIdAndFakeId),
    systemOptionValues: systemOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    detailOptionValues: detailOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    configurationOptionValues: configurationOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    systemDetails: systemDetails.map(mapTypes('detailType')),
    detailConfigurations: detailConfigurations.map(mapTypes('configurationType')),
    configurationParts: configurationParts.map(mapParts),
    newSystemOptions: newSystemOptions.map(removeTypenameAndNodeIdAndFakeId),
    newDetailOptions: newDetailOptions.map(removeTypenameAndNodeIdAndFakeId),
    newConfigurationOptions: newConfigurationOptions.map(removeTypenameAndNodeIdAndFakeId),
    newSystemOptionValues: newSystemOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    newDetailOptionValues: newDetailOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    newConfigurationOptionValues: newConfigurationOptionValues.map(removeTypenameAndNodeIdAndFakeId),
    newSystemDetails: newSystemDetails.map(mapNewTypes('detailType')),
    newDetailConfigurations: newDetailConfigurations.map(mapNewTypes('configurationType')),
    newConfigurationParts: newConfigurationParts.map(mapNewTypes('configurationPart')),
});