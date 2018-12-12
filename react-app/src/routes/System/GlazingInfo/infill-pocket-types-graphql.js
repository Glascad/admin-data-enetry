import gql from 'graphql-tag';
import { query } from './glazing-info-graphql';

export const create = {
    mutation: gql`mutation CreateSystemInfillPocketType(
        $systemId:Int!,
        $infillPocketTypeId:Int!
    ){
        createSystemInfillPocketType(
            input:{
                systemInfillPocketType:{
                    systemId:$systemId,
                    infillPocketTypeId:$infillPocketTypeId
                }
            }
        ){
            systemInfillPocketType{
                nodeId
                infillPocketTypeId
                infillPocketTypeByInfillPocketTypeId{
                    nodeId
                    type
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: ({
        data: {
            createSystemInfillPocketType: {
                systemInfillPocketType: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};

export const _delete = {
    mutation: gql`mutation DeleteSystemInfillPocketType(
        $nodeId:ID!
    ){
        deleteSystemInfillPocketType(
            input:{
                nodeId:$nodeId
            }
        ){
            systemInfillPocketType{
                nodeId
                infillPocketTypeId
                infillPocketTypeByInfillPocketTypeId{
                    nodeId
                    type
                }
                systemBySystemId{
                    nodeId
                }
            }
        }
    }`,
    refetchQueries: ({
        data: {
            deleteSystemInfillPocketType: {
                systemInfillPocketType: {
                    systemBySystemId: {
                        nodeId
                    }
                }
            }
        }
    }) => [{ query, variables: { nodeId } }]
};
