import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteSystemConfigurationOverride(
        $nodeId:ID!
    ){
        deleteSystemConfigurationOverride(
            input:{
                nodeId:$nodeId
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
    mapResultToProps: (deletedSystemConfigurationOverride, {
        system,
        system: {
            _systemConfigurationOverrides,
        },
    }) => ({
        system: {
            ...system,
            _systemConfigurationOverrides: _systemConfigurationOverrides
                .filter(override => !(
                    override.systemTypeId === deletedSystemConfigurationOverride.systemTypeId
                    &&
                    override.detailTypeId === deletedSystemConfigurationOverride.detailTypeId
                    &&
                    override.configurationTypeId === deletedSystemConfigurationOverride.configurationTypeId
                )),
        },
    }),
}
