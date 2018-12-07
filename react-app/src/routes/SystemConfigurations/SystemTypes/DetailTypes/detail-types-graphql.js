import gql from 'graphql-tag';
import { query as st_query } from '../system-types-graphql';

export const query = gql`{
    allDetailTypes{
        nodes{
            nodeId
            id
            type
            vertical
            entrance
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateSystemTypeDetailType(
        $systemTypeId:Int!,
        $detailTypeId:Int!
    ){
        createSystemTypeDetailType(input:{
            systemTypeDetailType:{
                systemTypeId:$systemTypeId,
                detailTypeId:$detailTypeId
            }
        }){
            systemTypeDetailType{
                nodeId
                detailTypeId
                systemTypeId
                systemTypeBySystemTypeId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: [{ query: st_query }]
};

export const _delete = {
    mutation: gql`mutation DeleteSystemTypeDetailType(
        $nodeId:ID!
    ){
        deleteSystemTypeDetailType(input:{
            nodeId:$nodeId
        }){
            systemTypeDetailType{
                nodeId
                detailTypeId
                systemTypeId
                systemTypeBySystemTypeId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: [{ query: st_query }]
};
