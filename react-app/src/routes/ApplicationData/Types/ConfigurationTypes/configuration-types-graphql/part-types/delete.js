import gql from 'graphql-tag';

export default {
    mutation: gql`mutation DeleteConfigurationTypePartType(
        $nodeId:ID!
    ){
        deleteConfigurationTypePartType(input:{
            nodeId:$nodeId
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
