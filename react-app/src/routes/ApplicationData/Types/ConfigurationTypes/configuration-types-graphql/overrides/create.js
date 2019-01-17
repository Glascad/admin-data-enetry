import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateConfigurationNameOverride(
        $manufacturerId:Int!,
        $configurationTypeId:Int!,
        $nameOverride:Int!
    ){
        createConfigurationNameOverride(
            input:{
                configurationNameOverride:{
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