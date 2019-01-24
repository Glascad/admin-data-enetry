import gql from 'graphql-tag';

import {
    removeNullValues,
} from '../../../../../utils';

export default {
    mutation: gql`mutation UpdateSystemConfigurationOverride(
        $nodeId:ID!,
        $requiredOverride:Boolean,
        $mirrorableOverride:Boolean,
        $presentationLevelOverride:Int,
        $overrideLevelOverride:Int
    ){
        updateSystemConfigurationOverride(
            nodeId:$nodeId
            input:{
                systemConfigurationOverridePatch:{
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
                            .map(override => (
                                override.systemId === newSystemConfigurationOverride.systemId ?
                                    newSystemConfigurationOverride
                                    :
                                    override
                            )),
                    }
                    :
                    stdtct)
            },
        },
    }),
}
