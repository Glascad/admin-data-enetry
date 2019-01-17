import gql from 'graphql-tag';

export default {
    mutation: gql`mutation UpdateConfigurationNameOverride(
        $nodeId:ID!,
        $manufacturerId:Int,
        $configurationTypeId:Int,
        $nameOverride:Int
    ){
        updateConfigurationNameOverride(
            input:{
                nodeId:$nodeId
                configurationNameOverridePatch:{
                    manufacturerId:$manufacturerId
                    configurationTypeId:$configurationTypeId
                    nameOverride:$nameOverride
                }
            }
        ){
            configurationNameOverride{
                nodeId
                id
                nameOverride
                manufacturerId
                configurationTypeId
            }
        }
    }`,
};