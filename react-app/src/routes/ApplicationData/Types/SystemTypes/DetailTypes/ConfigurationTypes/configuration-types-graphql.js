import gql from 'graphql-tag';
import { query as st_query } from '../../system-types-graphql';

export const query = gql`{
    allConfigurationTypes{
        nodes{
            nodeId
            id
            type
            door
            overrideLevel
            presentationLevel
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateSystemTypeDetailTypeConfigurationType(
        $systemTypeId:Int!,
        $detailTypeId:Int!,
        $configurationTypeId:Int!
    ){
        createSystemTypeDetailTypeConfigurationType(input:{
            systemTypeDetailTypeConfigurationType:{
                systemTypeId:$systemTypeId,
                detailTypeId:$detailTypeId,
                configurationTypeId:$configurationTypeId
            }
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                systemTypeId
                detailTypeId
                configurationTypeId
            }
        }
    }`,
    refetchQueries: [{ query: st_query }]
};

export const _delete = {
    mutation: gql`mutation DeleteSystemTypeDetailTypeConfigurationType(
        $nodeId:ID!
    ){
        deleteSystemTypeDetailTypeConfigurationType(input:{
            nodeId:$nodeId
        }){
            systemTypeDetailTypeConfigurationType{
                nodeId
                configurationTypeId
                detailTypeId
            }
        }
    }`,
    refetchQueries: [{ query: st_query }]
};
