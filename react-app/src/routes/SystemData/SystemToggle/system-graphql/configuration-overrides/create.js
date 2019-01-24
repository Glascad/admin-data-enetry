import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateSystemConfigurationOverride(
        $systemId:Int!,
        $systemTypeId:Int!,
        $detailTypeId:Int!,
        $configurationTypeId:Int!,
        $requiredOverride:Boolean,
        $mirrorableOverride:Boolean,
        $presentationLevelOverride:Int,
        $overrideLevelOverride:Int
    ){
        createSystemConfigurationOverride(
            input:{
                systemConfigurationOverride:{
                    systemId:$systemId
                    systemTypeId:$systemTypeId,
                    detailTypeId:$detailTypeId
                    configurationTypeId:$configurationTypeId
                    requiredOverride:$requiredOverride
                    mirrorableOverride:$mirrorableOverride
                    presentationLevelOverride:$presentationLevelOverride
                    overrideLevelOverride:$overrideLevelOverride
                }
            }
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
    mapResultToProps: (newSystemConfigurationOverride, {
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
                    stdtct.detailTypeId === newSystemConfigurationOverride.detailTypeId
                    &&
                    stdtct.configurationTypeId === newSystemConfigurationOverride.configurationTypeId
                ) ?
                    {
                        ...stdtct,
                        systemConfigurationOverrides: stdtct.systemConfigurationOverrides
                            .concat(newSystemConfigurationOverride),
                    }
                    :
                    stdtct)
            },
        },
    }),
}
