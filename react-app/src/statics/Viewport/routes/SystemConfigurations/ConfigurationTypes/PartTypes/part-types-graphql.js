import gql from 'graphql-tag';
import { query as ct_query } from '../configuration-types-graphql';

export const query = gql`{
    allPartTypes{
        nodes{
            nodeId
            id
            type
        }
    }
}`;

export const create = {
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
    refetchQueries: [{ query: ct_query }]
};

export const _delete = {
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
    refetchQueries: [{ query: ct_query }]
};
