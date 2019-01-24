import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemConfigurationOverride(
        $nodeId:ID!
    ){
        deleteSystemConfigurationOverride(
            nodeID:$nodeId
        ){
            systemConfigurationOverride{
                nodeId
                systemId
                systemTypeId
                detailTypeId
                configurationTypeId
                requiredOverride
                mirrorableOverride
                presentationLevelOverride
                overrideLevelOverride
            }
        }
    }`,
    mapResultToProps: (deletedSystemConfigurationOverride, {
        system,
        system: {
            systemType,
            systemType: {
                systemTypeDetailTypeConfigurationTypes,
            },
        },
    }) => ({
        system: {
            ...system,
            systemType: {
                ...systemType,
                systemTypeDetailTypeConfigurationTypes: systemTypeDetailTypeConfigurationTypes.map(stdtct => (
                    stdtct.detailTypeId === deletedSystemConfigurationOverride.detailTypeId
                    &&
                    stdtct.configurationTypeId === deletedSystemConfigurationOverride.configurationTypeId
                ) ?
                    {
                        ...stdtct,
                        systemConfigurationOverrides: [],
                    }
                    :
                    stdtct)
            },
        },
    }),
}
