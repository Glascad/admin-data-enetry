import gql from 'graphql-tag';

export default {
    mutation: gql`mutation CreateConfigurationTypePartType(
        $configurationTypeId:Int!,
        $partTypeId:Int!
    ){
        createConfigurationTypePartType(input:{
            configurationTypePartType:{
                configurationTypeId:$configurationTypeId,
                partTypeId:$partTypeId
            }
        }){
            configurationTypePartType{
                nodeId
                partTypeId
                configurationTypeId
                configurationTypeByConfigurationTypeId{
                    nodeId
                }
            }
        }
    }`,
};
