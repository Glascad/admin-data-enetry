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
            input:{
                nodeId:$nodeId
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
    mapResultToProps: (updatedSystemConfigurationOverride, {
        system,
        system: {
            systemConfigurationOverrides,
        },
    }) => ({
        system: {
            ...system,
            systemConfigurationOverrides: systemConfigurationOverrides
                .map(override => (
                    override.systemTypeId === updatedSystemConfigurationOverride.systemTypeId
                    &&
                    override.detailTypeId === updatedSystemConfigurationOverride.detailTypeId
                    &&
                    override.configurationTypeId === updatedSystemConfigurationOverride.configurationTypeId
                ) ?
                    updatedSystemConfigurationOverride
                    :
                    override
                ),
        },
    }),
}
